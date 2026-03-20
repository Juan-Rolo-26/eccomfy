import { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
    useSpring,
} from 'framer-motion';
import type { ReactNode } from 'react';

type CircularRevealProps = {
    /** Contenido de fondo visible antes de la transición (Video) */
    video: ReactNode;
    /** Contenido que se revela con el círculo (Features) */
    content: ReactNode;
};

/**
 * Circular reveal:
 * - El video queda de fondo.
 * - Los servicios se revelan con un círculo durante 100vh de scroll.
 * - Los servicios están PINNED (sticky) durante esos primeros 100vh.
 * - Una vez abierto el círculo, los servicios fluyen hacia arriba normalmente.
 */
export const CircularReveal = ({ video, content }: CircularRevealProps) => {
    // Referencia invisible de 100vh exactos para trackear la duración de la animación
    const animTrackerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // Trackeamos solo los primeros 100vh de scroll
    const { scrollYProgress } = useScroll({
        target: animTrackerRef,
        offset: ['start start', 'end start'], // 0 a 1 exactamente en 100vh
    });

    const smooth = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 28,
        mass: 1,
    });

    const clipPath = useTransform(
        smooth,
        [0.05, 0.95],
        [
            'circle(0% at 50% 50%)',
            'circle(150% at 50% 50%)',
        ],
    );

    if (shouldReduceMotion) {
        return (
            <div>
                {video}
                {content}
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            {/* 1. Div invisible de 100vh para medir el progreso del círculo */}
            <div
                ref={animTrackerRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '100vh', pointerEvents: 'none' }}
            />

            {/* 2. Contenedor principal del efecto. */}
            <div style={{ position: 'relative' }}>

                {/* 3. Contenedor Sticky. 
                    Se quedará pegado EXACTAMENTE hasta que el div spacer 
                    inferior termine de scrollear. */}
                <div style={{ position: 'sticky', top: 0 }}>

                    {/* VIDEO DE FONDO */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, height: '100vh', overflow: 'hidden' }}>
                        {video}
                    </div>

                    {/* FEATURES DENTRO DEL CÍRCULO */}
                    <motion.div
                        style={{
                            clipPath,
                            position: 'relative',
                            zIndex: 2,
                            background: '#080808',
                            willChange: 'clip-path',
                            minHeight: '100vh',
                        }}
                    >
                        {content}
                    </motion.div>

                </div>

                {/* SPACER INVISIBLE DE 100VH 
                    Esto dicta cuántos vh extra se queda scrolleando (pinned).
                    Como le dimos 100vh y tracker mide 100vh, la animación dura exactamente 
                    el mismo tiempo que el anclaje sticky. */}
                <div style={{ height: '100vh', pointerEvents: 'none' }} aria-hidden="true" />
            </div>
        </div>
    );
};