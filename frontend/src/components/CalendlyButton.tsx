import { ArrowUpRight } from 'lucide-react';

export const CalendlyButton = () => {
    return (
        <section className="cta-v2-section">
            {/* Contenido central */}
            <div className="cta-v2-inner">
                {/* Chip */}
                <div className="cta-v2-chip">
                    <span className="cta-v2-chip-dot" />
                    <span>Sin compromisos · 30 min</span>
                </div>

                {/* Título */}
                <h2 className="cta-v2-title">
                    Tu próximo paso<br />
                    <span className="cta-v2-title-em">empieza hoy</span>
                </h2>

                {/* Sub */}
                <p className="cta-v2-sub">
                    Agendá una llamada. Contanos tu negocio.<br className="cta-v2-br" />
                    Descubrí cómo escalar tu marca personal.
                </p>

                {/* Botón */}
                <a
                    href="https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20tengo%20un%20proyecto%20de%20software%20y%20me%20gustaría%20consultarles."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-v2-btn"
                    id="btn-agendar-consultoria"
                >
                    <span className="cta-v2-btn-text">Contanos tu proyecto</span>
                    <span className="cta-v2-btn-icon">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                    </span>
                </a>

            </div>
        </section>
    );
};
