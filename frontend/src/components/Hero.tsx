import { ArrowDownRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import heroPoster from '../assets/hero.png';
import heroVideo from '../assets/Video_hero.mp4';
import { BrandCarousel } from './BrandCarousel';

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
    /**
     * ── SEO: Preload del video hero en el head para mejorar LCP.
     * El video es el elemento LCP más probable — cargarlo early reduce el tiempo.
     */
    useEffect(() => {
        // Preload del poster (imagen de inicio) para LCP inmediato
        const linkPoster = document.createElement('link');
        linkPoster.rel = 'preload';
        linkPoster.as = 'image';
        linkPoster.href = heroPoster;
        linkPoster.setAttribute('fetchpriority', 'high');
        document.head.appendChild(linkPoster);

        return () => {
            if (document.head.contains(linkPoster)) {
                document.head.removeChild(linkPoster);
            }
        };
    }, []);

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
        /**
         * ── SEO NOTES ────────────────────────────────────────────────────────
         * id="inicio" → ancla para navegación interna (Navbar + internal links)
         * aria-label → accesibilidad + señal semántica para bots
         * El H1 usa la keyword principal: "Agencia de Software para PyMEs"
         * LSI keywords en el párrafo: soluciones tecnológicas, aplicaciones móviles,
         *   plataformas de alto rendimiento, negocios de la era digital
         * ─────────────────────────────────────────────────────────────────── */
        <section
            id="inicio"
            className="hero"
            aria-label="Hero — Eccomfy Agencia de Software para PyMEs en Córdoba"
        >
            {/*
             * VIDEO HERO — LCP Element
             * ──────────────────────────────────────────────────────────────
             * fetchpriority="high": le dice al navegador que este es recurso crítico
             * preload="metadata": evita descargar el video completo hasta que sea necesario.
             *   El poster (imagen) actúa como placeholder visual para LCP.
             * aria-hidden="true": los bots no indexan video decorativo (correcto)
             * ────────────────────────────────────────────────────────────── */}
            <video
                className="hero-video-bg"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={heroPoster}
                aria-hidden="true"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore — fetchpriority es válido en HTML5 moderno
                fetchpriority="high"
            >
                <source src={heroVideo} type="video/mp4" />
                {/* Fallback: si el navegador no soporta video */}
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
                    {/*
                     * H1 — ÚNICO en toda la página
                     * ────────────────────────────────────────────────────
                     * Keyword principal: "Agencia de Software para PyMEs"
                     * Longitud: 28 chars — óptimo para ranking
                     * Jerarquía: H1 → H2 (servicios) → H2 (nosotros) → H2 (proyectos)
                     * ─────────────────────────────────────────────────── */}
                    <motion.h1
                        className="hero-main-title"
                        variants={itemVariants}
                        style={{ fontFamily: "'Neue Machina', sans-serif" }}
                    >
                        Desarrollo de Software {' '}
                        <span className="hero-title-highlight">a medida</span>
                    </motion.h1>

                    {/*
                     * Párrafo descriptivo — Señales LSI para Google
                     * Keywords secundarias: soluciones tecnológicas a medida,
                     * aplicaciones móviles escalables, plataformas de alto rendimiento,
                     * Córdoba, Argentina, automatización, IA
                     */}
                    <motion.p className="hero-description" variants={itemVariants}>
                        En Eccomfy desarrollamos{' '}
                        <strong>soluciones tecnológicas a medida</strong> para PyMEs en Córdoba
                        y Argentina: sistemas de gestión, apps móviles escalables, automatizaciones
                        con IA y landing pages de alto rendimiento.
                    </motion.p>

                    <motion.div className="hero-actions" variants={buttonsVariants}>
                        {/* CTA principal — rel="noopener noreferrer" para seguridad */}
                        <a
                            href="https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20tengo%20un%20proyecto%20de%20software%20y%20me%20gustaría%20consultarles."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-btn hero-btn-primary"
                            id="btn-cta-hero-principal"
                            aria-label="Consultar por WhatsApp con Eccomfy"
                        >
                            Contanos tu Proyecto
                            <ArrowDownRight size={18} aria-hidden="true" />
                        </a>

                        <button
                            type="button"
                            className="hero-btn hero-btn-secondary"
                            onClick={handleScroll}
                            aria-label="Ver servicios de software de Eccomfy"
                            id="btn-ver-servicios-hero"
                        >
                            Ver servicios
                        </button>
                    </motion.div>

                    {/* Separador sutil */}
                    <motion.div
                        className="hero-brand-divider"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.4, ease: EASE_CINEMATIC }}
                    />

                    {/* Carrusel de marcas — señal de E-E-A-T (Experience) */}
                    <BrandCarousel />
                </motion.div>
            </div>

            {/* scroll-indicator: CSS se encarga del bounce y del fade-in con delay */}
            <button
                type="button"
                className="scroll-indicator"
                onClick={handleScroll}
                aria-label="Continuar hacia la siguiente sección"
                id="btn-scroll-hero"
            >
                <span>Continua</span>
                <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
        </section>
    );
};
