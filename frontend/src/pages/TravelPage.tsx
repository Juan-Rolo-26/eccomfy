import { useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Features } from '../components/Features';
import { motion } from 'framer-motion';
import { Plane, ShieldCheck, Globe, Users, CalendarCheck, BarChart3, Layers, Headphones, ArrowUpRight } from 'lucide-react';
import imgTopo from '../assets/topotoursweb.png';
import './SoftwarePage.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CALENDLY_URL = 'https://calendly.com/juanpablorolo2007/new-meeting-1?primary_color=336b41';

const whyChooseUs = [
    { icon: Plane, title: 'Expertos en turismo', desc: 'Desarrollamos sistemas pensados 100% para agencias de viaje. Conocemos los flujos, los desafíos y las necesidades del rubro.' },
    { icon: Headphones, title: 'Soporte continuo', desc: 'No te dejamos solo después de la entrega. Te acompañamos con soporte, actualizaciones y mejoras constantes.' },
    { icon: ShieldCheck, title: 'Sistema seguro y confiable', desc: 'Datos de clientes, pagos y reservas protegidos. Infraestructura robusta para que operes con total tranquilidad.' },
    { icon: Layers, title: 'Todo en un solo lugar', desc: 'Reservas, clientes, proveedores, pagos y reportes centralizados en una sola plataforma diseñada para vos.' },
];

const whyNeedSystem = [
    { icon: CalendarCheck, title: 'Gestión de reservas sin caos', desc: 'Dejá de manejar reservas por WhatsApp y planillas. Un sistema propio te da control total, trazabilidad y cero errores.' },
    { icon: Users, title: 'Base de clientes profesional', desc: 'Historial de viajes, preferencias, datos de contacto. Conocé a tus pasajeros y ofreceles experiencias personalizadas.' },
    { icon: BarChart3, title: 'Reportes y métricas claras', desc: 'Sabé cuánto vendés, qué destinos funcionan y dónde mejorar. Decisiones basadas en datos, no en intuición.' },
    { icon: Globe, title: 'Presencia digital profesional', desc: 'Tu agencia necesita una web que transmita confianza y permita a tus clientes explorar destinos y consultar online.' },
];

export const TravelPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = `
            <div class="calendly-inline-widget" data-url="${CALENDLY_URL}" style="min-width:320px;width:100%;height:950px;min-height:950px;"></div>
        `;
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        containerRef.current.appendChild(script);
    }, []);

    return (
        <div className="app-container" style={{ background: '#f2f0ea', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEOHead
                title="Sistema Completo para Agencias de Viaje | Eccomfy"
                description="Desarrollamos el sistema integral que tu agencia de viajes necesita: reservas, clientes, pagos y reportes en una sola plataforma. Consultoría gratuita."
                canonical="https://eccomfyarg.com/agencia-viajes"
                schema={[]}
            />

            <section className="sw-camp-hero sw-camp-hero--travel">
                <motion.div
                    className="sw-camp-hero__content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                >
                    <p className="sw-camp-hero__question">
                        ¿Tu agencia de viajes sigue manejando todo con planillas y WhatsApp?
                    </p>
                    <h1 className="sw-camp-hero__title">
                        Desarrollamos el{' '}
                        <span className="sw-camp-hero__accent">Sistema Completo </span>
                        para tu Agencia de Viajes
                    </h1>
                    <p className="sw-camp-hero__sub">
                        Agendá una consultoría con nuestro equipo de forma{' '}
                        <span className="sw-camp-hero__accent">gratuita</span>{' '}
                        <span className="sw-camp-hero__accent">completando</span> el formulario{' '}
                        <span className="sw-camp-hero__accent">debajo</span>.
                    </p>
                    <a href="#caso-topotours" className="sw-camp-hero__project-link">
                        Ver proyecto realizado
                        <ArrowUpRight size={16} strokeWidth={2} />
                    </a>
                </motion.div>

                <motion.div
                    className="sw-camp-calendly"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: EASE }}
                >
                    <div ref={containerRef} />
                </motion.div>
            </section>

            <section className="sw-why">
                <div className="sw-why__inner">
                    <motion.div
                        className="sw-why__header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <span className="sw-why__eyebrow">POR QUÉ ELEGIRNOS</span>
                        <h2 className="sw-why__title">
                            La tecnología que tu agencia{' '}
                            <span>estaba necesitando</span>
                        </h2>
                        <p className="sw-why__subtitle">
                            Creamos sistemas a medida para agencias de viaje que quieren profesionalizarse y crecer.
                        </p>
                    </motion.div>

                    <div className="sw-why__grid">
                        {whyChooseUs.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="sw-why__card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                            >
                                <div className="sw-why__card-icon">
                                    <item.icon size={26} strokeWidth={1.8} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASO DE ÉXITO: TOPO TOURS ── */}
            <section id="caso-topotours" className="sw-case sw-case--large">
                <div className="sw-case__inner">
                    <motion.div
                        className="sw-case__text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <span className="sw-case__eyebrow">CASO DE ÉXITO</span>
                        <h2 className="sw-case__title">Topo Tours</h2>
                        <p className="sw-case__subtitle">Agencia de viajes con presencia digital profesional</p>
                        <p className="sw-case__desc">
                            Topo Tours necesitaba una plataforma digital que transmitiera la emoción de viajar y al mismo tiempo funcionara como herramienta comercial.
                            Desarrollamos su web completa: catálogo de destinos, sistema de consultas y una experiencia visual que invita a explorar.
                        </p>
                        <p className="sw-case__desc">
                            El resultado: una presencia online profesional que genera confianza, atrae pasajeros y posiciona a la agencia como referente en su zona.
                        </p>
                        <a href="https://topotours.com" target="_blank" rel="noopener noreferrer" className="sw-case__link">
                            Ver proyecto <ArrowUpRight size={16} strokeWidth={2} />
                        </a>
                    </motion.div>
                    <motion.div
                        className="sw-case__visual"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                    >
                        <img src={imgTopo} alt="Topo Tours — Web para agencia de viajes desarrollada por Eccomfy" loading="lazy" />
                    </motion.div>
                </div>
            </section>

            <section className="sw-whyweb">
                <div className="sw-whyweb__inner">
                    <motion.div
                        className="sw-why__header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <span className="sw-whyweb__eyebrow">TU AGENCIA LO NECESITA</span>
                        <h2 className="sw-whyweb__title">
                            ¿Por qué tu agencia necesita un{' '}
                            <span>sistema propio?</span>
                        </h2>
                        <p className="sw-whyweb__subtitle">
                            Las agencias que crecen son las que dejan de improvisar y empiezan a sistematizar.
                        </p>
                    </motion.div>

                    <div className="sw-whyweb__grid">
                        {whyNeedSystem.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="sw-whyweb__card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                            >
                                <div className="sw-whyweb__card-icon">
                                    <item.icon size={26} strokeWidth={1.8} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div style={{ position: 'relative', zIndex: 3, background: '#f2f0ea' }}>
                <Features />
            </div>
        </div>
    );
};
