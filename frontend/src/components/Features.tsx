import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const SERVICES = [
    {
        id: 'ia',
        num: '01',
        title: 'IA y Automatizaciones',
        items: ['Chatbots con IA', 'Automatización de procesos', 'Flujos con n8n / Make', 'Integraciones con APIs'],
        desc: 'Potenciá tu negocio con inteligencia artificial y flujos automatizados que trabajan mientras vos descansás.',
    },
    {
        id: 'web',
        num: '02',
        title: 'Desarrollo Web',
        items: ['Websites a medida', 'Landing Pages', 'React, Next.js, Node.js', 'E-commerce & tiendas online'],
        desc: 'Sitios rápidos, responsivos y diseñados para convertir visitas en clientes reales.',
    },
    {
        id: 'seo',
        num: '03',
        title: 'SEO & SEM',
        items: ['Posicionamiento orgánico', 'Google Ads', 'Auditorías SEO', 'Optimización de conversión'],
        desc: 'Aparecé primero cuando te buscan. Estrategias que llevan tráfico real y calificado a tu negocio.',
    },
    {
        id: 'branding',
        num: '04',
        title: 'Branding',
        items: ['Identidad visual', 'Diseño de logo', 'Manual de marca', 'Paleta & tipografía'],
        desc: 'Una marca coherente y memorable que genera confianza desde el primer contacto.',
    },
    {
        id: 'metaads',
        num: '05',
        title: 'Meta Ads',
        items: ['Campañas en Facebook', 'Campañas en Instagram', 'Retargeting', 'Gestión y optimización'],
        desc: 'Anuncios que llegan a las personas correctas, en el momento justo, con el mensaje adecuado.',
    },
    {
        id: 'estrategia',
        num: '06',
        title: 'Estrategia de Marketing',
        items: ['Plan de marketing digital', 'Análisis de competencia', 'Embudo de ventas', 'Reportes & métricas'],
        desc: 'Una hoja de ruta clara para hacer crecer tu negocio con acciones concretas y medibles.',
    },
    {
        id: 'community',
        num: '07',
        title: 'Community Manager',
        items: ['Gestión de redes sociales', 'Creación de contenido', 'Calendarios editoriales', 'Análisis de audiencia'],
        desc: 'Presencia activa y estratégica en redes que construye comunidad y genera oportunidades.',
    },
 ] as const;

type ServiceId = (typeof SERVICES)[number]['id'];

export const Features = () => {
    const [openId, setOpenId] = useState<ServiceId | null>('ia');

    const toggle = (id: ServiceId) => setOpenId((current) => (current === id ? null : id));

    return (
        <section id="servicios" className="services-section">
            <div className="services-inner container">
                <div className="services-header">
                    <span className="services-label">Productos & Servicios</span>
                    <h2 className="services-title">
                        Soluciones digitales<br />que impulsan tu negocio.
                    </h2>
                </div>

                <div className="services-list">
                    {SERVICES.map((svc) => {
                        const isOpen = openId === svc.id;
                        return (
                            <div key={svc.id} className={`service-item ${isOpen ? 'service-item--open' : ''}`}>
                                <button
                                    type="button"
                                    className="service-header"
                                    onClick={() => toggle(svc.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="service-num">{svc.num}</span>
                                    <span className="service-name">{svc.title}</span>
                                    <span className="service-toggle">
                                        {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="service-body">
                                        <ul className="service-bullets">
                                            {svc.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                        <div className="service-detail">
                                            <p>{svc.desc}</p>
                                            <a href="#contacto" className="service-link">
                                                Más información
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
