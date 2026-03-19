import { ArrowDownRight, ChevronDown } from 'lucide-react';
import heroPoster from '../assets/hero.png';
import heroVideo from '../assets/videohero.mp4';

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
                <div className="hero-content">
                    <h1 className="hero-main-title">Agencia Digital de Marketing</h1>

                    <p className="hero-description">
                        Desarrollamos ecosistemas digitales que convierten tráfico en
                        oportunidades reales, transformando cada interacción en
                        crecimiento medible para tu negocio.
                    </p>

                    <div className="hero-actions">
                        <a href="#contacto" className="hero-btn hero-btn-primary">
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
                    </div>
                </div>
            </div>

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
