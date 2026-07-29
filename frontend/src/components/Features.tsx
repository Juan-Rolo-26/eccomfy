import { SERVICES_DATA } from '../data/services';
import './Features.css';

export const Features = () => {
    return (
        <section
            id="servicios"
            className="services-grid-section"
            aria-label="Servicios de agencia digital de Eccomfy"
        >
            <div className="services-grid-inner container">
                <div className="services-grid-header">
                    <span className="services-grid-label" aria-hidden="true">
                        SERVICIOS
                    </span>
                    <h2 className="services-grid-main-title">
                        Todo lo que tu ecosistema digital necesita, diseñado para <i>el crecimiento.</i>
                    </h2>
                </div>

                <div className="services-grid-layout">
                    {SERVICES_DATA.map((svc) => (
                        <div key={svc.id} className="service-card">
                            <div className="service-card-img-wrapper">
                                <img
                                    src={svc.image}
                                    alt={svc.title}
                                    className="service-card-img"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="service-card-title">{svc.title}</h3>
                            <p className="service-card-desc">{svc.desc}</p>

                            <div className="service-card-includes-wrapper">
                                <span className="service-card-includes-label">INCLUYE</span>
                                <p className="service-card-features">
                                    {svc.items.join(' · ')}
                                </p>
                            </div>

                            <a
                                href={`https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20quisiera%20más%20información%20sobre%20el%20servicio%20de%20${svc.title}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="service-card-btn"
                            >
                                Más información &rarr;
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
