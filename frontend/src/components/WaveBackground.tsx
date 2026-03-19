import { useEffect, useRef } from 'react';

type Particle = {
    x: number;
    y: number;
    r: number;
    speed: number;
    alpha: number;
    drift: number;
};

type WaveBand = {
    y: number;
    amp: number;
    wl: number;
    speed: number;
    lines: number;
    gap: number;
    color: string;
    glow: number;
};

export const WaveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let raf = 0;
        let t = 0;

        /* ───────────────── PARTICLES ───────────────── */
        const PARTICLE_COUNT = 70;

        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: 0.8 + Math.random() * 2.5,
            speed: 0.00015 + Math.random() * 0.00025,
            alpha: 0.15 + Math.random() * 0.5,
            drift: (Math.random() - 0.5) * 0.00015,
        }));

        /* ───────────────── RESIZE ───────────────── */
        const resize = () => {
            const W = canvas.parentElement?.clientWidth || window.innerWidth;
            const H = canvas.parentElement?.clientHeight || window.innerHeight;

            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        /* ───────────────── WAVES CONFIG ───────────────── */
        const bands: WaveBand[] = [
            {
                y: 0.35,
                amp: 0.14,
                wl: 0.25,
                speed: 0.012,
                lines: 26,
                gap: 6,
                color: '62,178,144',
                glow: 0.12,
            },
            {
                y: 0.55,
                amp: 0.11,
                wl: 0.20,
                speed: 0.018,
                lines: 18,
                gap: 5,
                color: '23,119,91',
                glow: 0.08,
            },
            {
                y: 0.75,
                amp: 0.08,
                wl: 0.16,
                speed: 0.008,
                lines: 14,
                gap: 4.5,
                color: '100,210,175',
                glow: 0.06,
            },
        ];

        /* ───────────────── DRAW ───────────────── */
        const draw = () => {
            const W = canvas.clientWidth;
            const H = canvas.clientHeight;

            ctx.clearRect(0, 0, W, H);

            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#020202');
            bg.addColorStop(1, '#050505');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            /* ───────────── WAVES ───────────── */
            bands.forEach((band) => {
                const baseY = H * band.y;
                const amplitude = H * band.amp;
                const waveLen = W * band.wl;

                for (let i = 0; i < band.lines; i++) {
                    const prog = i / band.lines;
                    const alpha = 0.03 + prog * 0.6;
                    const offsetY = (i - band.lines / 2) * band.gap;

                    ctx.beginPath();

                    for (let x = -40; x <= W + 40; x += 3) {
                        const phase = x / waveLen - t * band.speed;
                        const y =
                            baseY +
                            offsetY +
                            Math.sin(phase) * amplitude +
                            Math.sin(x * 0.004 + t * 0.01 + i * 0.1) *
                                amplitude *
                                0.2;

                        if (x === -40) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }

                    ctx.strokeStyle = `rgba(${band.color},${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                const g = ctx.createRadialGradient(
                    W / 2,
                    baseY,
                    0,
                    W / 2,
                    baseY,
                    amplitude * 2,
                );
                g.addColorStop(0, `rgba(${band.color},${band.glow})`);
                g.addColorStop(1, `rgba(${band.color},0)`);

                ctx.fillStyle = g;
                ctx.fillRect(0, baseY - amplitude, W, amplitude * 2);
            });

            /* ───────────── PARTICLES ───────────── */
            particles.forEach((p) => {
                p.y -= p.speed;
                p.x += p.drift;

                if (p.y < -0.02) {
                    p.y = 1.02;
                    p.x = Math.random();
                }

                if (p.x < -0.02) p.x = 1.02;
                if (p.x > 1.02) p.x = -0.02;

                const px = p.x * W;
                const py = p.y * H;

                const glow = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
                glow.addColorStop(0, `rgba(62,178,144,${p.alpha * 0.6})`);
                glow.addColorStop(1, 'rgba(62,178,144,0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(px, py, p.r * 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(px, py, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(62,178,144,${p.alpha})`;
                ctx.fill();
            });

            /* ───────────── VIGNETTE ───────────── */
            const vignette = ctx.createRadialGradient(
                W / 2,
                H / 2,
                H * 0.3,
                W / 2,
                H / 2,
                H,
            );
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(0,0,0,0.6)');

            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, W, H);

            t += 0.8;
            raf = requestAnimationFrame(draw);
        };

        resize();
        draw();

        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="wave-background-canvas" />;
};
