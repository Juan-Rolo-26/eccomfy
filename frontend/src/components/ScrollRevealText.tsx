import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutImg from '../assets/Socios.jpg';

const PARAGRAPH = "En Eccomfy ayudamos a empresas, emprendedores y organizaciones a transformar desafíos en oportunidades con estrategias integrales. Nuestro enfoque combina marketing, contenido audiovisual y desarrollo para crear campañas que generan impacto real en el negocio. Somos los socios estratégicos que tu marca necesita para crecer en el ecosistema digital.";

const RevealWord = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity, display: 'inline-block', marginRight: '5px' }}>
            {children}
        </motion.span>
    );
};

export const ScrollRevealText = () => {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "center center"]
    });

    const words = PARAGRAPH.split(" ");

    return (
        <section
            id="nosotros"
            ref={containerRef}
            style={{
                backgroundColor: '#f2f0ea',
                padding: '7rem 2%',          /* minimal side padding = más ancho */
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: '100%',            /* sin restricción de ancho */
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                gap: '5rem',
            }}>
                {/* ── Left: Content ── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', paddingLeft: '4%' }}
                >
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#17775b',
                        padding: '0.4rem 1.2rem',
                        border: '1px solid rgba(23, 119, 91, 0.3)',
                        backgroundColor: 'rgba(23, 119, 91, 0.08)',
                        borderRadius: '999px',
                        alignSelf: 'flex-start'
                    }}>
                        Sobre Nosotros
                    </span>

                    <h2 style={{
                        fontFamily: 'var(--font-display, sans-serif)',
                        fontSize: 'clamp(3.5rem, 5.5vw, 6.5rem)',
                        fontWeight: 700,
                        color: '#0d1f1a',
                        lineHeight: 1.02,
                        letterSpacing: '-2px',
                        margin: 0
                    }}>
                        Socios estratégicos<br />
                        de tu <span style={{ color: '#17775b' }}>negocio</span>
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '1.35rem',
                        lineHeight: 1.7,
                        color: '#333333',
                        margin: 0,
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = start + (1 / words.length);
                            return (
                                <RevealWord key={i} progress={scrollYProgress} range={[start, end]}>
                                    {word}
                                </RevealWord>
                            );
                        })}
                    </p>
                </motion.div>

                {/* ── Right: Image ── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
                    style={{
                        position: 'relative',
                        height: '700px',
                    }}
                >
                    <img
                        src={aboutImg}
                        alt="Equipo Eccomfy — Agencia digital en Córdoba"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '20px',
                            display: 'block',
                            boxShadow: '0 30px 80px -12px rgba(23, 119, 91, 0.2), 0 0 0 1px rgba(0,0,0,0.06)',
                        }}
                        loading="lazy"
                    />
                    {/* decorative green accent stripe */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '-20px',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #17775b, #3eb290)',
                        opacity: 0.18,
                        filter: 'blur(20px)',
                        zIndex: 0,
                    }} />
                </motion.div>
            </div>
        </section>
    );
};
