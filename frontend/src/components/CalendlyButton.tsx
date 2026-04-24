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
                    Transformamos tu experiencia en un <span className="consult-title-accent">Negocio Digital</span>
                </h2>

                <p className="consult-sub">
                    Especializados en profesionales con +10 años de trayectoria. Agendá una llamada de 30 min, contanos tu proyecto y descubrí el potencial de tu Marca Personal.
                </p>

                <a
                    href="https://calendar.app.google/EoBKLEcB5YFkrNfB6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="consult-cta"
                    id="btn-agendar-consultoria"
                >
                    <Calendar size={22} strokeWidth={2} className="consult-cta-icon" />
                    <span className="consult-cta-text">Contanos tu proyecto</span>
                </a>
            </div>
        </section>
    );
};
