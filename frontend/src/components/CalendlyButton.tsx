import { Calendar } from 'lucide-react';

export const CalendlyButton = () => {
    return (
        <section className="consult-section-container">
            {/* Fondo con resplandores ambientales integrados */}
            <div className="consult-background">
                <div className="consult-glow consult-glow--left" />
                <div className="consult-glow consult-glow--right" />
            </div>

            {/* Contenedor central de contenido */}
            <div className="consult-content">
                <span className="consult-eyebrow">Sin compromisos · 30 min</span>

                <h2 className="consult-title">
                    Conocé el potencial real <span className="consult-title-accent">de tu marca</span>
                </h2>

                <p className="consult-sub">
                    En una llamada de 30 minutos te mostramos un análisis claro de tu situación actual y las oportunidades que podés aprovechar hoy mismo.
                </p>

                <a
                    href="https://calendly.com/eccomfy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="consult-cta"
                    id="btn-agendar-consultoria"
                >
                    <Calendar size={22} strokeWidth={2} className="consult-cta-icon" />
                    <span className="consult-cta-text">Agendar consultoría gratuita</span>
                </a>
            </div>
        </section>
    );
};
