import { ArrowUpRight } from 'lucide-react';

export const BrandDiagnostic = () => {
    return (
        <section className="diag-section" id="diagnostico">

            {/* Background decorations */}
            <div className="diag-bg-glow diag-bg-glow--left" />
            <div className="diag-bg-glow diag-bg-glow--right" />

            <div className="diag-inner">

                <div className="diag-header">
                    <span className="diag-eyebrow">Diagnóstico gratuito · 2 min</span>
                    <h2 className="diag-title">
                        Analizá tu marca con este{' '}
                        <span className="diag-title-accent">diagnóstico gratuito</span>
                    </h2>
                    <p className="diag-sub">
                        Completá este diagnóstico y analizamos a fondo tu situación actual para detectar las oportunidades que hoy estás dejando pasar (y que probablemente ni estás viendo).
                    </p>
                    <p className="diag-extra">
                        Al finalizar, accedés a una consultoría gratuita donde te mostramos un plan claro, accionable y enfocado en escalar tu marca con estrategia.
                    </p>
                </div>

                {/* CTA */}
                <div className="diag-cta-wrap">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScAWnkk_tyTTVR0Xsibh7saA-KNQhdw_kas1wMQJksqrKu-3Q/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="diag-cta"
                    >
                        Hacer diagnóstico
                        <ArrowUpRight size={24} strokeWidth={2} />
                    </a>
                </div>

            </div>
        </section>
    );
};
