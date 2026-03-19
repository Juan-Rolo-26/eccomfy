import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type StackingWrapperProps = {
    children: React.ReactNode;
    zIndex: number;
    overlayColor?: string;
};

/**
 * Crea un efecto de apilamiento ("stacking"):
 * A medida que la sección scrollea hacia arriba para salir de la pantalla,
 * se mueve un poco hacia abajo con parallax y se oscurece/escala haciéndola 
 * ver como si la sección que le sigue estuviera deslizándose directamente encima de ella.
 */
export const StackingWrapper = ({ children, zIndex, overlayColor = '#000' }: StackingWrapperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        // La animación empieza cuando el BOTTOM de esta sección toca el BOTTOM del viewport
        // y termina cuando el BOTTOM llega al TOP del viewport (cuando es superada por la siguiente sección).
        offset: ['end end', 'end start'],
    });

    // Parallax: mientras la página sube 100vh, esta sección baja 40vh, 
    // por ende la que sigue lo va a tapar rápido.
    // También escala para lograr el efecto "premium card stack"
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
    const yStr = useTransform(scrollYProgress, [0, 1], ['0vh', '40vh']);

    // Un overlay negro que se vuelve un poco opaco para dar ilusión de sombra
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

    if (shouldReduceMotion) {
        return <div style={{ position: 'relative', zIndex }}>{children}</div>;
    }

    return (
        <div ref={containerRef} style={{ position: 'relative', zIndex }}>
            <motion.div
                style={{
                    scale,
                    y: yStr,
                    transformOrigin: 'top center',
                    willChange: 'transform',
                }}
            >
                {children}

                {/* Capa de oscurecimiento */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: overlayColor,
                        opacity: overlayOpacity,
                        pointerEvents: 'none',
                        zIndex: 50,
                    }}
                />
            </motion.div>

            {/* Box shadow to naturally cast over sections below */}
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '100px',
                boxShadow: '0 40px 100px rgba(0,0,0,1)',
                pointerEvents: 'none',
                zIndex: 60,
                opacity: 0 /* solo si quisieramos sombra hacia abajo */
            }} />
        </div>
    );
};
