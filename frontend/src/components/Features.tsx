import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';

type ServiceId = (typeof SERVICES_DATA)[number]['id'];

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
                    {SERVICES_DATA.map((svc) => {
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
                                            <Link to={`/servicios/${svc.id}`} className="service-link">
                                                Más información
                                            </Link>
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
