import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { SERVICES_DATA } from '../data/services';

type ServiceId = (typeof SERVICES_DATA)[number]['id'];

export const Features = () => {
    const [openId, setOpenId] = useState<ServiceId | null>(null);

    const toggle = (id: ServiceId) => setOpenId((current) => (current === id ? null : id));

    return (
        /*
         * ── SEO ──────────────────────────────────────────────────────────
         * id="servicios" → ancla de navegación interna (internal linking)
         * H2: "Soluciones digitales que impulsan tu negocio" — keyword secundaria
         * Cada servicio como li con aria-expanded → señal de contenido expandible
         * itemType Product/Service → schema implícito en HTML5
         * ────────────────────────────────────────────────────────────────── */
        <section
            id="servicios"
            className="services-section"
            aria-label="Servicios de software para PyMEs de Eccomfy"
            itemScope
            itemType="https://schema.org/ItemList"
        >
            <div className="services-inner container">
                <div className="services-header">
                    {/* Label semántico — no H1, no H2, es decorativo */}
                    <span
                        className="services-label"
                        aria-hidden="true"
                    >
                        Productos & Servicios
                    </span>

                    {/*
                     * H2 — keyword secundaria con LSI
                     * "soluciones digitales" + "impulsan tu negocio" = intención comercial clara
                     */}
                    <h2 className="services-title" itemProp="name">
                        Soluciones digitales que{' '}
                        <span>impulsan tu negocio.</span>
                    </h2>

                    {/* Descripción de sección — señal de contenido relevante */}
                    <p className="services-subtitle" style={{ display: 'none' }}>
                        En Eccomfy desarrollamos software a medida para PyMEs en Córdoba y Argentina:
                        sistemas de gestión, apps móviles, inteligencia artificial, cloud y landing pages.
                    </p>
                </div>

                {/* Lista de servicios — accordion SEO-friendly */}
                <ul
                    className="services-list"
                    role="list"
                    aria-label="Lista de servicios de software de Eccomfy"
                >
                    {SERVICES_DATA.map((svc, index) => {
                        const isOpen = openId === svc.id;
                        const panelId = `service-panel-${svc.id}`;
                        const headerId = `service-header-${svc.id}`;

                        return (
                            <li
                                key={svc.id}
                                className={`service-item ${isOpen ? 'service-item--open' : ''}`}
                                itemScope
                                itemType="https://schema.org/Service"
                                itemProp="itemListElement"
                            >
                                {/* Posición para schema ItemList */}
                                <meta itemProp="position" content={String(index + 1)} />

                                <button
                                    type="button"
                                    id={headerId}
                                    className="service-header"
                                    onClick={() => toggle(svc.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    aria-label={`${isOpen ? 'Cerrar' : 'Ver detalles de'}: ${svc.title}`}
                                >
                                    <span className="service-num" aria-hidden="true">
                                        {svc.num}
                                    </span>
                                    <span
                                        className="service-name"
                                        itemProp="name"
                                    >
                                        {svc.title}
                                    </span>
                                    <span className="service-toggle" aria-hidden="true">
                                        {isOpen ? (
                                            <Minus size={20} strokeWidth={1.5} />
                                        ) : (
                                            <Plus size={20} strokeWidth={1.5} />
                                        )}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div
                                        id={panelId}
                                        className="service-body"
                                        role="region"
                                        aria-labelledby={headerId}
                                    >
                                        <ul
                                            className="service-bullets"
                                            aria-label={`Características de ${svc.title}`}
                                        >
                                            {svc.items.map((item) => (
                                                <li key={item} itemProp="description">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="service-detail">
                                            <p itemProp="description">{svc.desc}</p>
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Internal link prominente — CTA semántico */}
                <div className="services-cta" style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <a
                        href="https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20servicios%20de%20software."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="services-cta-link"
                        id="btn-cta-servicios"
                        aria-label="Consultá gratis sobre nuestros servicios de software para PyMEs"
                    >
                        Consultá sobre nuestros servicios →
                    </a>
                </div>
            </div>
        </section>
    );
};
