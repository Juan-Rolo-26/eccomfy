import { useEffect, useRef } from "react";

/**
 * Gradient-Mesh Background
 * ─────────────────────────
 * 4 enormous soft radial blobs drift imperceptibly slow across
 * a near-black canvas. No particles, no lines, no aurora.
 * Quiet, premium motion.
 */
export default function GradientBackground() {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let W, H;
        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // ─── Blob definitions ────────────────────────────────────────────────
        const blobs = [
            {
                cx: 0.18, cy: 0.30, r: 0.70,
                speedX: 0.00022, speedY: 0.00018,
                phaseX: 0.0, phaseY: 1.2,
                ampX: 0.12, ampY: 0.10,
                color: [36, 199, 143],   // brand green
                peakAlpha: 0.13,
            },
            {
                cx: 0.82, cy: 0.22, r: 0.60,
                speedX: 0.00016, speedY: 0.00021,
                phaseX: 2.5, phaseY: 0.4,
                ampX: 0.09, ampY: 0.12,
                color: [16, 90, 65],   // deep forest
                peakAlpha: 0.16,
            },
            {
                cx: 0.50, cy: 0.75, r: 0.65,
                speedX: 0.00019, speedY: 0.00014,
                phaseX: 1.1, phaseY: 3.0,
                ampX: 0.11, ampY: 0.08,
                color: [20, 140, 100],   // mid teal
                peakAlpha: 0.11,
            },
            {
                cx: 0.85, cy: 0.80, r: 0.50,
                speedX: 0.00025, speedY: 0.00020,
                phaseX: 3.7, phaseY: 1.8,
                ampX: 0.08, ampY: 0.10,
                color: [36, 199, 143],   // brand green accent
                peakAlpha: 0.08,
            },
        ];

        // ─── Render loop ─────────────────────────────────────────────────────
        let t = 0;

        function draw() {
            t++;

            // ── Base fill: near-black with the tiniest green warmth ──────────
            ctx.fillStyle = "#040907";
            ctx.fillRect(0, 0, W, H);

            // ── Draw each blob ───────────────────────────────────────────────
            blobs.forEach((b) => {
                // Drift position (sine waves, extremely slow)
                const x = (b.cx + Math.sin(t * b.speedX + b.phaseX) * b.ampX) * W;
                const y = (b.cy + Math.cos(t * b.speedY + b.phaseY) * b.ampY) * H;
                const r = b.r * Math.min(W, H);

                const [R, G, B] = b.color;

                const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
                grd.addColorStop(0, `rgba(${R},${G},${B},${b.peakAlpha})`);
                grd.addColorStop(0.35, `rgba(${R},${G},${B},${+(b.peakAlpha * 0.55).toFixed(4)})`);
                grd.addColorStop(0.70, `rgba(${R},${G},${B},${+(b.peakAlpha * 0.18).toFixed(4)})`);
                grd.addColorStop(1, `rgba(${R},${G},${B},0)`);

                ctx.save();
                ctx.globalCompositeOperation = "screen";
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
                ctx.restore();
            });

            // ── Vignette: pulls edges to pure black ──────────────────────────
            const vign = ctx.createRadialGradient(
                W / 2, H / 2, Math.min(W, H) * 0.25,
                W / 2, H / 2, Math.max(W, H) * 0.85,
            );
            vign.addColorStop(0, "rgba(0,0,0,0)");
            vign.addColorStop(1, "rgba(0,0,0,0.88)");
            ctx.fillStyle = vign;
            ctx.fillRect(0, 0, W, H);

            rafRef.current = requestAnimationFrame(draw);
        }

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
            }}
        />
    );
}
