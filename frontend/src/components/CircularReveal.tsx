import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type CircularRevealProps = {
    /** La sección que queda debajo como fondo (Video) */
    bottom: React.ReactNode;
    /** La sección que se revela con el círculo (Features) */
    top: React.ReactNode;
};

/**
 * Efecto "revelar circular":
 * - `bottom` (Video) queda sticky como una pantalla completa de 100vh.
 * - `top` (Features) arranca con margin-top -100vh, solapado sobre el video.
 * - Un clip-path circle(0%→150%) revela Features a medida que scrolleás.
 */
export const CircularReveal = ({ bottom, top }: CircularRevealProps) => {
    const topRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // El scroll se trakea relativo al cr-top (Features)
    const { scrollYProgress } = useScroll({
        target: topRef,
        // Empieza cuando la parte superior de `top` toca el 100% del viewport (acaba de aparecer)
        // Termina cuando la parte superior llegó al -20% (bien anclada)
        offset: ['start 100%', 'start -20%'],
    });

    // clip-path circle: de invisible → completamente visible
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.7, 1],
        [
            'circle(0% at 50% 20%)',    // comienza como un punto en la parte alta
            'circle(70% at 50% 50%)',   // círculo mediano
            'circle(150% at 50% 50%)',  // cubre todo
        ],
    );

    if (shouldReduceMotion) {
        return (
            <div>
                {bottom}
                {top}
            </div>
        );
    }

    return (
        <div className="cr-wrapper">
            {/* Video — sticky, 100vh, queda detrás */}
            <div className="cr-bottom">
                {bottom}
            </div>

            {/* Features — solapado encima del video, se revela con clip-path */}
            <motion.div
                ref={topRef}
                className="cr-top"
                style={{ clipPath }}
            >
                {top}
            </motion.div>
        </div>
    );
};
