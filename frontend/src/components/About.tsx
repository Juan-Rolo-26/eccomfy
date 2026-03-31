import { useRef, useEffect, useState } from 'react';
import { Target, Eye, TrendingUp, Cpu, BarChart3, PenTool, Layers } from 'lucide-react';
import './About.css';

export const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '100px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const pilares = [
        {
            title: 'Estrategia',
            desc: 'Cada decisión parte de un análisis profundo. Diseñamos caminos claros hacia el crecimiento, basados en datos y objetivos concretos.',
            icon: <TrendingUp size={26} strokeWidth={1.5} />,
        },
        {
            title: 'Innovación',
            desc: 'Incorporamos tecnología, automatización e inteligencia artificial como ventaja competitiva en cada proyecto.',
            icon: <Cpu size={26} strokeWidth={1.5} />,
        },
        {
            title: 'Resultados',
            desc: 'Nos enfocamos en lo que realmente importa: crecimiento medible, posicionamiento sólido y rendimiento constante.',
            icon: <BarChart3 size={26} strokeWidth={1.5} />,
        },
        {
            title: 'Diseño & Experiencia',
            desc: 'Creamos experiencias digitales que combinan estética, funcionalidad y conversión.',
            icon: <PenTool size={26} strokeWidth={1.5} />,
        },
        {
            title: 'Escalabilidad',
            desc: 'Desarrollamos sistemas preparados para evolucionar y sostener el crecimiento a largo plazo.',
            icon: <Layers size={26} strokeWidth={1.5} />,
        },
    ];

    return (
        <section
            id="sobre-nosotros"
            className={`about-section ${visible ? 'about-section--visible' : ''}`}
            ref={sectionRef}
        >
            {/* Decorative orbs */}
            <div className="about-orb about-orb--1" />
            <div className="about-orb about-orb--2" />

            <div className="about-inner container">

                {/* ══════ BLOCK 1: Header + Quiénes somos ══════ */}
                <div className="about-block about-block--intro">
                    <div className="about-header about-reveal" style={{ transitionDelay: '0s' }}>
                        <span className="about-label">Sobre Nosotros</span>
                        <h2 className="about-title">
                            Quiénes <span>somos</span>
                        </h2>
                    </div>

                    <div className="about-intro-text about-reveal" style={{ transitionDelay: '0.1s' }}>
                        <p>
                            En <strong>Eccomfy</strong> diseñamos y construimos sistemas de crecimiento para marcas que buscan algo más que presencia digital: buscan <em>posicionamiento, escalabilidad y resultados reales.</em>
                        </p>
                        <p>
                            Somos una agencia que integra estrategia, desarrollo y tecnología para <strong>transformar negocios en activos digitales sólidos.</strong> Cada proyecto que tomamos es abordado con una visión integral, donde el marketing, el diseño y la automatización trabajan en conjunto para generar impacto y crecimiento sostenible.
                        </p>
                    </div>

                    <div className="about-manifesto about-reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="about-manifesto__line" />
                        <div className="about-manifesto__content">
                            <p>No creemos en soluciones genéricas.</p>
                            <p>Creemos en sistemas bien pensados, ejecutados con precisión.</p>
                        </div>
                    </div>
                </div>

                {/* ══════ BLOCK 2: Misión & Visión ══════ */}
                <div className="about-block about-block--mv">
                    <div className="about-mv-grid">
                        <div className="mv-card about-reveal" style={{ transitionDelay: '0.25s' }}>
                            <div className="mv-card__header">
                                <div className="mv-icon">
                                    <Target size={28} strokeWidth={1.5} />
                                </div>
                                <h3>Misión</h3>
                            </div>
                            <p>
                                Impulsar el crecimiento de marcas y empresas a través de soluciones digitales estratégicas, combinando marketing, desarrollo web y automatización para construir sistemas eficientes, escalables y orientados a resultados.
                            </p>
                        </div>

                        <div className="mv-card about-reveal" style={{ transitionDelay: '0.35s' }}>
                            <div className="mv-card__header">
                                <div className="mv-icon mv-icon--vision">
                                    <Eye size={28} strokeWidth={1.5} />
                                </div>
                                <h3>Visión</h3>
                            </div>
                            <p>
                                Ser una agencia líder en Latinoamérica en la creación de ecosistemas digitales de alto rendimiento, redefiniendo la forma en que las marcas crecen mediante el uso inteligente de la tecnología.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ══════ BLOCK 3: Pilares ══════ */}
                <div className="about-block about-block--pilares">
                    <div className="about-pilares-header about-reveal" style={{ transitionDelay: '0.4s' }}>
                        <span className="about-label">Fundamentos</span>
                        <h3>
                            Nuestros <span>Pilares</span>
                        </h3>
                        <p>Los fundamentos que sostienen nuestra forma de trabajar.</p>
                    </div>

                    <div className="about-pilares-grid">
                        {pilares.map((pilar, index) => (
                            <div
                                key={index}
                                className="pilar-card about-reveal"
                                style={{ transitionDelay: `${0.45 + 0.08 * index}s` }}
                            >
                                <div className="pilar-card__top">
                                    <div className="pilar-icon">
                                        {pilar.icon}
                                    </div>
                                    <span className="pilar-number">0{index + 1}</span>
                                </div>
                                <h4 className="pilar-title">{pilar.title}</h4>
                                <p className="pilar-desc">{pilar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
