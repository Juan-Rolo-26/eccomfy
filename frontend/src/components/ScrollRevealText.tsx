import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PARAGRAPH = "En Eccomfy no somos una simple agencia, somos arquitectos de tu marca personal. Diseñamos ecosistemas digitales para profesionales expertos con +10 años de trayectoria, permitiéndoles desarrollar su propio negocio digital a través de su experiencia y vender sus productos mediante su marca personal.";

export const ScrollRevealText = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Auto-pause if it scrolls completely out of view (optional polish)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && isPlaying && videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.1 }
        );
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => observer.disconnect();
    }, [isPlaying]);

    return (
        <section
            id="nosotros"
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
                        opacity: 0.85,
                        margin: 0,
                        maxWidth: '600px'
                    }}>
                        {PARAGRAPH}
                    </p>
                </motion.div>

                {/* Video Side */}
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
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={togglePlay}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '520px',
                            aspectRatio: '9/16',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(23, 119, 91, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            backgroundColor: '#000',
                            transform: 'translateZ(0)' // Hardware acceleration
                        }}
                    >
                        <video
                            ref={videoRef}
                            src="/reel-video.mp4"
                            loop
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                transition: 'transform 0.5s ease',
                                transform: (isHovered && !isPlaying) ? 'scale(1.02)' : 'scale(1)'
                            }}
                        />

                        {/* Custom Play/Pause Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                            transition: 'background-color 0.4s ease'
                        }}>
                            <motion.div
                                initial={false}
                                animate={{
                                    opacity: isPlaying && !isHovered ? 0 : 1,
                                    scale: isPlaying ? 0.9 : 1
                                }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                                }}
                            >
                                {isPlaying ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                                        <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" />
                                    </svg>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
