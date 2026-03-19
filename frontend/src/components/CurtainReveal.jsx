import { useEffect, useRef } from "react";

/**
 * CurtainReveal
 * ─────────────
 * Un telón de líquido oscuro que cubre la pantalla al cargar.
 * Se retira de izquierda a derecha con un borde blob/orgánico
 * y un halo verde brillante en el filo.
 */
export default function CurtainReveal({ onDone }) {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Fijar dimensiones en píxeles reales
        const W = (canvas.width = window.innerWidth);
        const H = (canvas.height = window.innerHeight);

        const startTime = performance.now();
        const HOLD_MS = 350;   // pausa inicial cubierto
        const SWEEP_MS = 1350;  // duración del barrido

        // ─── Easing ─────────────────────────────────────────────────────────
        function easeInOutQuart(t) {
            return t < 0.5
                ? 8 * t * t * t * t
                : 1 - Math.pow(-2 * t + 2, 4) / 2;
        }

        // ─── Generar puntos del borde blob ──────────────────────────────────
        function buildEdge(edgeX, amp, t, N = 100) {
            const pts = [];
            for (let i = 0; i <= N; i++) {
                const frac = i / N;
                const y = frac * H;
                // superposición de 3 senos → borde orgánico
                const wave =
                    Math.sin(frac * Math.PI * 3.8 + t * 6.5) * amp +
                    Math.sin(frac * Math.PI * 6.5 + t * 4.8) * amp * 0.38 +
                    Math.sin(frac * Math.PI * 1.4 - t * 3.2) * amp * 0.22;
                pts.push({ x: edgeX + wave, y });
            }
            return pts;
        }

        // ─── Dibujar forma de telón con curvas suaves ────────────────────────
        function drawCurtain(pts, style) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(pts[0].x, pts[0].y);

            for (let i = 0; i < pts.length - 1; i++) {
                const mx = (pts[i].x + pts[i + 1].x) / 2;
                const my = (pts[i].y + pts[i + 1].y) / 2;
                ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
            }

            ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
            ctx.lineTo(0, H);
            ctx.closePath();
            ctx.fillStyle = style;
            ctx.fill();
        }

        // ─── Loop principal ──────────────────────────────────────────────────
        function draw() {
            const elapsed = performance.now() - startTime;

            ctx.clearRect(0, 0, W, H);

            // Progreso del barrido (0 → 1)
            const sweepRaw = elapsed <= HOLD_MS
                ? 0
                : Math.min((elapsed - HOLD_MS) / SWEEP_MS, 1);
            const sweepEased = easeInOutQuart(sweepRaw);

            const t = elapsed / 1000;
            const edgeX = (W + 180) * (1 - sweepEased); // avanza hacia la izquierda
            const amp = 100 * Math.sin(Math.PI * sweepRaw); // amplitude: 0→peak→0

            // — Sombra trasera (más a la derecha, más transparente)
            const shadowPts = buildEdge(edgeX + 70, amp * 0.55, t + 0.4);
            drawCurtain(shadowPts, "rgba(0,8,4,0.45)");

            // — Curtain secundario (ligero offset) para sensación de masa
            const midPts = buildEdge(edgeX + 28, amp * 0.75, t + 0.15);
            drawCurtain(midPts, "#011208");

            // — Telón principal
            const mainPts = buildEdge(edgeX, amp, t);
            const grad = ctx.createLinearGradient(0, 0, Math.max(edgeX, 1), 0);
            grad.addColorStop(0, "#000a05");
            grad.addColorStop(0.7, "#020e07");
            grad.addColorStop(1, "#04180a");
            drawCurtain(mainPts, grad);

            // — Filo brillante verde (efecto de borde líquido)
            if (sweepRaw > 0 && sweepRaw < 1) {
                const glowAlpha = Math.sin(Math.PI * sweepRaw);

                ctx.save();
                ctx.shadowColor = "#24c78f";
                ctx.shadowBlur = 30;

                // Línea exterior gruesa (glow)
                ctx.beginPath();
                ctx.moveTo(mainPts[0].x, mainPts[0].y);
                for (let i = 0; i < mainPts.length - 1; i++) {
                    const mx = (mainPts[i].x + mainPts[i + 1].x) / 2;
                    const my = (mainPts[i].y + mainPts[i + 1].y) / 2;
                    ctx.quadraticCurveTo(mainPts[i].x, mainPts[i].y, mx, my);
                }
                ctx.strokeStyle = `rgba(36,199,143,${glowAlpha * 0.8})`;
                ctx.lineWidth = 4;
                ctx.stroke();

                // Hilo interior más nítido
                ctx.shadowBlur = 10;
                ctx.strokeStyle = `rgba(95,234,182,${glowAlpha * 0.6})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.restore();
            }

            // — Drips en el borde inferior (gotas colgantes)
            if (sweepRaw > 0.1 && sweepRaw < 0.9) {
                const nDrips = 6;
                for (let d = 0; d < nDrips; d++) {
                    const bx = edgeX + Math.sin(d * 1.7 + t * 2) * amp * 0.6;
                    const by = H - (d % 2 === 0 ? 40 : 20) * sweepRaw;
                    const dripLen = (20 + d * 8) * Math.sin(Math.PI * sweepRaw);
                    ctx.save();
                    ctx.beginPath();
                    ctx.ellipse(bx, by - dripLen / 2, 5 - d * 0.5, dripLen / 2 + 3, 0, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(4,20,10,${0.8 * Math.sin(Math.PI * sweepRaw)})`;
                    ctx.fill();
                    ctx.restore();
                }
            }

            // ─── Coordinación perfecta: onDone anticipado ───
            // Llamamos a onDone cuando el barrido va por el 75% para que
            // el contenido de abajo empiece a aparecer MIENTRAS el telón se retira.
            if (sweepRaw > 0.75 && !canvas.dataset.triggered) {
                canvas.dataset.triggered = "true";
                onDone?.();
            }

            // ─── Fade Out final del canvas para evitar corte brusco ───
            if (sweepRaw > 0.85) {
                const fade = 1 - (sweepRaw - 0.85) / 0.15; // 1 -> 0
                ctx.globalAlpha = fade;
            } else {
                ctx.globalAlpha = 1;
            }

            if (elapsed < HOLD_MS + SWEEP_MS + 200) {
                rafRef.current = requestAnimationFrame(draw);
            }
        }

        rafRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafRef.current);
    }, [onDone]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "block",
                width: "100vw",
                height: "100vh",
                background: "#020806",
                pointerEvents: "all",
            }}
        />
    );
}
