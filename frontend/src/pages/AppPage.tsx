import { useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Features } from '../components/Features';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Zap, HeadphonesIcon, Workflow, TrendingUp, Target, Rocket } from 'lucide-react';
import './SoftwarePage.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CALENDLY_URL = 'https://calendly.com/juanpablorolo2007/new-meeting?primary_color=316b35';

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
                        Agendá una consultoría con nuestro equipo de forma{' '}
                        <span className="sw-camp-hero__accent">gratuita</span>{' '}
                        <span className="sw-camp-hero__accent">completando</span> el formulario{' '}
                        <span className="sw-camp-hero__accent">debajo</span>.
                    </p>
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
