import { ArrowDownRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import heroPoster from '../assets/hero.png';
import heroVideo from '../assets/videohero.mp4';

// Easing cinematográfico: arranque lento, llegada suave (tipo power2.out)
const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.5,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 52,
        filter: 'blur(6px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1.4,
            ease: EASE_CINEMATIC,
        },
    },
};

// Variante más sutil para los botones (menos desplazamiento)
const buttonsVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: EASE_CINEMATIC,
        },
    },
};


export const Hero = () => {
    const handleScroll = () => {
        const next =
            document.querySelector<HTMLElement>('#servicios') ||
            document.querySelector<HTMLElement>('#nosotros') ||
            document.querySelector<HTMLElement>('#features') ||
            document.querySelector<HTMLElement>('.cta-section');

        if (next) {
            next.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="inicio" className="hero">
            <video
                className="hero-video-bg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={heroPoster}
                aria-hidden="true"
            >
                <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="hero-overlay" />
            <div className="hero-noise" />

            <div className="hero-container">
                {/* Contenedor staggered: cada hijo entra de forma escalonada */}
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ animation: 'none' }} /* desactiva heroFadeUp CSS */
                >
                    <motion.h1
                        className="hero-main-title"
                        variants={itemVariants}
                        style={{ fontFamily: "'Neue Machina', sans-serif" }}
                    >
                        Agencia Digital de Marketing
                    </motion.h1>

                    <motion.p className="hero-description" variants={itemVariants}>
                        Desarrollamos ecosistemas digitales que convierten audiencias en
                        alumnos comprometidos, transformando cada interacción en
                        crecimiento medible para tu academia o curso online.
                    </motion.p>

                    <motion.div className="hero-actions" variants={buttonsVariants}>
                        <a href="https://calendly.com/eccomfy" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-primary">
                            Hablemos de tu proyecto
                            <ArrowDownRight size={18} />
                        </a>

                        <button
                            type="button"
                            className="hero-btn hero-btn-secondary"
                            onClick={handleScroll}
                        >
                            Ver servicios
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* scroll-indicator: CSS se encarga del bounce y del fade-in con delay */}
            <button
                type="button"
                className="scroll-indicator"
                onClick={handleScroll}
                aria-label="Ir hacia abajo"
            >
                <span>Scroll</span>
                <ChevronDown size={18} strokeWidth={1.8} />
            </button>
        </section>
    );
};
