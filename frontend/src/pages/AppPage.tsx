import { SEOHead } from '../components/SEOHead';
import { Features } from '../components/Features';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Zap, HeadphonesIcon, Workflow, TrendingUp, Target, Rocket, ArrowUpRight } from 'lucide-react';
import './SoftwarePage.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const whyChooseUs = [
    { icon: Lightbulb, title: 'De idea a producto', desc: 'Transformamos tu problema en una aplicación funcional. Vos ponés la idea, nosotros la tecnología.' },
    { icon: HeadphonesIcon, title: 'Acompañamiento real', desc: 'No te dejamos solo con un entregable. Te acompañamos desde el día uno hasta que tu app esté funcionando.' },
    { icon: ShieldCheck, title: 'Sin riesgo', desc: 'Consultoría inicial gratuita. Si no te convence la propuesta, no pagás nada. Así de simple.' },
    { icon: Zap, title: 'Desarrollo ágil', desc: 'Sprints cortos con entregas parciales. Ves avances reales cada semana, no promesas.' },
];

const whyBuildApp = [
    { icon: Workflow, title: 'Automatizá lo repetitivo', desc: 'Si hacés lo mismo todos los días de forma manual, una app puede hacerlo por vos en segundos. Recuperá horas de tu semana.' },
    { icon: Target, title: 'Resolvé el problema de raíz', desc: 'Una planilla de Excel no escala. Una app a medida resuelve tu problema específico y crece con tu negocio.' },
    { icon: TrendingUp, title: 'Diferenciarte de la competencia', desc: 'Una herramienta propia te da una ventaja competitiva que nadie puede copiar. Tu proceso, tu lógica, tu app.' },
    { icon: Rocket, title: 'Escalar sin sumar costos', desc: 'Una aplicación bien hecha atiende 10 o 10.000 usuarios sin que tengas que contratar más gente.' },
];

export const AppPage = () => {
    return (
        <div className="app-container" style={{ background: '#f2f0ea', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEOHead
                title="Convertí tu Idea en una App Funcional | Eccomfy"
                description="¿Tenés un problema que se resuelve con tecnología? Desarrollamos tu aplicación a medida. Consultoría gratuita. Eccomfy, Argentina."
                canonical="https://eccomfyarg.com/app"
                schema={[]}
            />

            <section className="sw-camp-hero">
                <motion.div
                    className="sw-camp-hero__content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                >
                    <p className="sw-camp-hero__question">
                        ¿Tenés un problema en tu trabajo que podrías resolver con una aplicación?
                    </p>
                    <h1 className="sw-camp-hero__title">
                        Convertimos Tu{' '}
                        <span className="sw-camp-hero__accent">Problema en una APP </span>
                        que Funciona
                    </h1>
                    <p className="sw-camp-hero__sub">
                        Escribinos por WhatsApp y hablemos sobre cómo darle vida a tu aplicación de forma{' '}
                        <span className="sw-camp-hero__accent">rápida y segura</span>.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a
                            href="https://wa.me/5493513712759?text=Hola%20Eccomfy%2C%20tengo%20una%20idea%20de%20aplicación%20y%20me%20gustaría%20consultarles."
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
                            Desarrolladores que{' '}
                            <span>entienden tu problema</span>
                        </h2>
                        <p className="sw-why__subtitle">
                            No hacemos apps genéricas. Escuchamos tu problema y construimos la solución exacta que necesitás.
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

            <section className="sw-whyweb">
                <div className="sw-whyweb__inner">
                    <motion.div
                        className="sw-why__header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <span className="sw-whyweb__eyebrow">TECNOLOGÍA QUE RESUELVE</span>
                        <h2 className="sw-whyweb__title">
                            ¿Por qué construir una{' '}
                            <span>aplicación a medida?</span>
                        </h2>
                        <p className="sw-whyweb__subtitle">
                            Si tu problema es único, la solución también debería serlo.
                        </p>
                    </motion.div>

                    <div className="sw-whyweb__grid">
                        {whyBuildApp.map((item, i) => (
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
