import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutImg from '../assets/Socios.jpg';
import './ScrollRevealText.css';

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
            className="scroll-reveal-container"
            style={{
                backgroundColor: '#f2f0ea',
                overflow: 'hidden'
            }}
        >
            <div className="scroll-reveal-grid">
                {/* ── Left: Content ── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="scroll-reveal-left"
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

                    <h2 className="scroll-reveal-title">
                        Socios estratégicos<br />
                        de tu <span style={{ color: '#17775b' }}>negocio</span>
                    </h2>

                    <p className="scroll-reveal-text">
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
                    className="scroll-reveal-image-wrapper"
                >
                    <img
                        src={aboutImg}
                        alt="Equipo Eccomfy — Agencia digital en Córdoba"
                        className="scroll-reveal-image"
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
