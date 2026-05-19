import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PARAGRAPH = "En Eccomfy no somos una simple agencia, somos arquitectos de tu marca personal. Diseñamos ecosistemas digitales para profesionales expertos con +10 años de trayectoria, permitiéndoles desarrollar su propio negocio digital a través de su experiencia y vender sus productos mediante su marca personal.";

const RevealWord = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
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
                padding: '6rem 4%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: '1400px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4rem',
                margin: '0 auto',
                flexWrap: 'wrap'
            }}>
                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#17775b',
                        padding: '0.4rem 1.2rem',
                        border: '1px solid rgba(23, 119, 91, 0.3)',
                        backgroundColor: 'rgba(23, 119, 91, 0.08)',
                        borderRadius: '999px',
                        alignSelf: 'flex-start'
                    }}>
                        Nuestra filosofía
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-display, sans-serif)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        color: '#0d1f1a',
                        lineHeight: 1.1,
                        margin: 0
                    }}>
                        Arquitectos de tu <span style={{ color: '#17775b' }}>marca personal</span>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '1.25rem',
                        lineHeight: 1.6,
                        color: '#333333',
                        margin: 0,
                        maxWidth: '600px',
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

                {/* Video Side — YouTube Shorts Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{
                        flex: '1 1 500px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '520px',
                            aspectRatio: '9/16',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(23, 119, 91, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
                            backgroundColor: '#000',
                            transform: 'translateZ(0)'
                        }}
                    >
                        <iframe
                            src="https://drive.google.com/file/d/1NT-s8Rl6EI9LDTxhE46e80DhqOMSuvdj/preview"
                            title="Eccomfy — Reel de marca personal"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                display: 'block'
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

