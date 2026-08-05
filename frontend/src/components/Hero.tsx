import { useEffect, useRef } from "react";
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../assets/video_hero.mp4';
import heroPoster from '../assets/hero.png';
import { BrandCarousel } from './BrandCarousel';
import './Hero.css';

const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: EASE_CINEMATIC } },
};

export const Hero = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }

        const linkPoster = document.createElement('link');
        linkPoster.rel = 'preload';
        linkPoster.as = 'image';
        linkPoster.href = heroPoster;
        document.head.appendChild(linkPoster);

        return () => {
            if (document.head.contains(linkPoster)) {
                document.head.removeChild(linkPoster);
            }
        };
    }, []);

    const handleActionPrimary = () => {
        window.open('https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20quisiera%20reservar%20una%20sesión%20de%20estrategia.', '_blank');
    };

    const handleScrollServices = () => {
        navigate('/servicios');
        window.scrollTo(0, 0);
    };

    return (
        <section id="inicio" className="hero-dark-v2" aria-label="Hero — Eccomfy Agencia de Software">

            {/* Animated Video Background */}
            <video
                ref={videoRef}
                className="hero-video-bg-v2"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={heroPoster}
                aria-hidden="true"
                src={heroVideo}
            />
            <div className="hero-cosmic-bg">
                <div className="hero-cosmic-glow"></div>
            </div>

            <div className="hero-v2-container wide">
                <motion.div
                    className="hero-v2-content wide"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hero-v2-left">
                        <motion.div className="hero-v2-badge" variants={itemVariants}>
                            Agencia Digital B2B
                        </motion.div>

                        <motion.h1 className="hero-v2-title" variants={itemVariants}>
                            Agencia digital para Pymes
                        </motion.h1>

                        <motion.p className="hero-v2-description" variants={itemVariants}>
                            Somos Eccomfy, una agencia digital especializada en digitalizar pymes contando servicios como el desarrollo de plataformas a medida, sitios web corporativos, content management (redes sociales), estrategias de posicionamiento, filmmaking y Meta Ads para escalar negocios ambiciosos.
                        </motion.p>

                        <motion.div className="hero-v2-actions" variants={itemVariants}>
                            <button onClick={handleActionPrimary} className="hero-v2-btn hero-v2-btn-primary">
                                Reserva una sesión de estrategia
                                <ArrowUpRight size={18} />
                            </button>

                            <button onClick={handleScrollServices} className="hero-v2-btn hero-v2-btn-secondary">
                                Descubre nuestros servicios
                                <ArrowUpRight size={18} />
                            </button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-carousel-wrapper">
                            <BrandCarousel />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};
