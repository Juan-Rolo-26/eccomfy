import { SEOHead } from '../components/SEOHead';
import { Features } from '../components/Features';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap, Users, Globe, BarChart3, Clock, Sparkles, ArrowUpRight } from 'lucide-react';
import imgMagna from '../assets/Magna_web.png';
import './SoftwarePage.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const whyChooseUs = [
    { icon: Clock, title: 'Entrega en 1 mes', desc: 'Trabajamos con sprints ágiles para que tengas tu software o landing page funcionando en tiempo récord.' },
    { icon: Users, title: 'Especialistas en PyMEs', desc: 'Entendemos los desafíos de las pequeñas y medianas empresas argentinas. Soluciones reales, sin burocracia.' },
    { icon: ShieldCheck, title: 'Calidad garantizada', desc: 'Si no cumplimos el plazo, no pagás. Así de simple. Tu inversión está protegida.' },
    { icon: Zap, title: 'Tecnología moderna', desc: 'React, Next.js, Node.js, IA. Usamos las mismas herramientas que las startups más exitosas del mundo.' },
];

const whyHaveWeb = [
    { icon: Globe, title: 'Tu negocio abierto 24/7', desc: 'Una web profesional trabaja para vos incluso cuando dormís. Tus clientes pueden conocerte, consultarte y comprarte a cualquier hora.' },
    { icon: TrendingUp, title: 'Más clientes, más ventas', desc: 'El 81% de los consumidores investigan online antes de comprar. Sin web, esos clientes van a tu competencia.' },
    { icon: BarChart3, title: 'Credibilidad profesional', desc: 'Una landing page bien diseñada genera confianza inmediata. Es tu mejor vendedor digital, siempre disponible.' },
    { icon: Sparkles, title: 'Automatizá tu negocio', desc: 'Un software a medida elimina tareas repetitivas, centraliza información y te permite escalar sin sumar costos fijos.' },
];

export const SoftwarePage = () => {
    return (
        <div className="app-container" style={{ background: '#f2f0ea', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEOHead
                title="Software y Landing Pages para PyMEs en 1 Mes | Eccomfy"
                description="Desarrollamos software a medida y landing pages profesionales para PyMEs. En 1 mes o no pagás. Agendá tu consultoría gratuita."
                canonical="https://eccomfyarg.com/software"
                schema={[]}
            />

            {/* ── HERO CAMPAÑA ── */}
            <section className="sw-camp-hero">
                <motion.div
                    className="sw-camp-hero__content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                >
                    <p className="sw-camp-hero__question">
                        ¿Necesitás un software a medida o una landing page profesional para tu PyME?
                    </p>
                    <h1 className="sw-camp-hero__title">
                        Desarrollamos Tu{' '}
                        <span className="sw-camp-hero__accent">Software en 1 MES </span>
                        o no PAGÁS
                    </h1>
                    <p className="sw-camp-hero__sub">
                        Escribinos por WhatsApp y hablemos sobre cómo escalar tu negocio de forma{' '}
                        <span className="sw-camp-hero__accent">rápida y segura</span>.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a
                            href="https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20tengo%20una%20PyME%20y%20me%20gustaría%20consultarles%20por%20un%20software."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#1c6643',
                                color: '#fff',
                                padding: '14px 28px',
                                borderRadius: '999px',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(28, 102, 67, 0.25)',
                                transition: 'all 0.25s ease'
                            }}
                        >
                            Empecemos tu proyecto
                            <ArrowUpRight size={18} strokeWidth={2.5} />
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* ── POR QUÉ ELEGIRNOS ── */}
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
                            La agencia que entiende{' '}
                            <span>tu negocio</span>
                        </h2>
                        <p className="sw-why__subtitle">
                            No somos una fábrica genérica de software. Somos socios tecnológicos de PyMEs argentinas.
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

            {/* ── POR QUÉ TENER UNA WEB / SOFTWARE ── */}
            <section className="sw-whyweb">
                <div className="sw-whyweb__inner">
                    <motion.div
                        className="sw-why__header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <span className="sw-whyweb__eyebrow">TU PYME NECESITA TECNOLOGÍA</span>
                        <h2 className="sw-whyweb__title">
                            ¿Por qué tu PyME necesita una{' '}
                            <span>web y software propio?</span>
                        </h2>
                        <p className="sw-whyweb__subtitle">
                            En 2026, no tener presencia digital profesional es perder clientes todos los días.
                        </p>
                    </motion.div>

                    <div className="sw-whyweb__grid">
                        {whyHaveWeb.map((item, i) => (
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

            {/* ── CASO DE ÉXITO ── */}
            <section className="sw-case sw-case--large">
                <div className="sw-case__inner">
                    <motion.div
                        className="sw-case__text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <span className="sw-case__eyebrow">CASO DE ÉXITO</span>
                        <h2 className="sw-case__title">MagnaMKT</h2>
                        <p className="sw-case__subtitle">Presencia digital premium para una agencia de desarrollo</p>
                        <p className="sw-case__desc">
                            MagnaMKT necesitaba un ecosistema digital sólido, escalable y convincente.
                            Construimos una plataforma que refleja innovación, seguridad y robustez,
                            con foco en la estructura del mensaje y una identidad premium.
                        </p>
                        <p className="sw-case__desc">
                            El resultado: una presencia digital a la altura de una marca que entiende
                            la importancia de la tecnología como motor de crecimiento.
                        </p>
                        <a href="https://magnamkt.com" target="_blank" rel="noopener noreferrer" className="sw-case__link">
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
                        <img src={imgMagna} alt="MagnaMKT — Web desarrollada por Eccomfy" loading="lazy" />
                    </motion.div>
                </div>
                <motion.div
                    className="sw-case__all-projects"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                >
                    <a href="/proyectos" className="sw-case__projects-btn">
                        Ver todos nuestros proyectos
                        <ArrowUpRight size={18} strokeWidth={2} />
                    </a>
                </motion.div>
            </section>

            {/* ── SERVICIOS ── */}
            <div style={{ position: 'relative', zIndex: 3, background: '#f2f0ea' }}>
                <Features />
            </div>
        </div>
    );
};
