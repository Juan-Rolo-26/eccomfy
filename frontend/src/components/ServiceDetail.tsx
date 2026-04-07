import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Zap, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import './ServiceDetail.css';

export const ServiceDetail = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = SERVICES_DATA.find((s) => s.id === serviceId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [serviceId]);

    if (!service) {
        return (
            <div className="sd-not-found">
                <h1>Servicio no encontrado</h1>
                <Link to="/" className="sd-back-link">
                    <ArrowLeft size={18} /> Volver al inicio
                </Link>
            </div>
        );
    }

    // Get adjacent services for navigation
    const currentIndex = SERVICES_DATA.findIndex((s) => s.id === serviceId);
    const prevService = currentIndex > 0 ? SERVICES_DATA[currentIndex - 1] : null;
    const nextService = currentIndex < SERVICES_DATA.length - 1 ? SERVICES_DATA[currentIndex + 1] : null;

    return (
        <div className="sd">
            {/* Back Button */}
            <motion.div
                className="sd-back"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Link to="/#servicios" className="sd-back-link">
                    <ArrowLeft size={18} strokeWidth={2} />
                    <span>Volver a servicios</span>
                </Link>
            </motion.div>

            {/* Hero Section */}
            <section className="sd-hero">
                <div className="sd-hero__content">
                    <motion.span
                        className="sd-hero__num"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        {service.num}
                    </motion.span>

                    <motion.h1
                        className="sd-hero__title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {service.title}
                    </motion.h1>

                    <motion.p
                        className="sd-hero__desc"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                    >
                        {service.fullDescription}
                    </motion.p>

                    <motion.a
                        href="#contacto"
                        className="sd-hero__cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Solicitar consulta gratuita
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                    </motion.a>
                </div>

                <motion.div
                    className="sd-hero__image"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img src={service.image} alt={service.title} />
                    <div className="sd-hero__image-overlay" />
                </motion.div>
            </section>

            {/* Impact Section */}
            <motion.section
                className="sd-impact"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.6 }}
            >
                <div className="sd-impact__icon">
                    <TrendingUp size={24} strokeWidth={1.5} />
                </div>
                <div className="sd-impact__body">
                    <h2 className="sd-impact__title">Impacto en tu negocio</h2>
                    <p className="sd-impact__text">{service.impact}</p>
                </div>
            </motion.section>

            {/* What's included */}
            <section className="sd-includes">
                <motion.div
                    className="sd-includes__header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="sd-includes__icon">
                        <Target size={24} strokeWidth={1.5} />
                    </div>
                    <h2 className="sd-includes__title">Qué incluye</h2>
                </motion.div>

                <div className="sd-includes__grid">
                    {service.items.map((item, i) => (
                        <motion.div
                            key={item}
                            className="sd-includes__item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <div className="sd-includes__check">
                                <Check size={16} strokeWidth={2.5} />
                            </div>
                            <span>{item}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="sd-process">
                <motion.div
                    className="sd-process__header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="sd-process__icon">
                        <Zap size={24} strokeWidth={1.5} />
                    </div>
                    <h2 className="sd-process__title">Proceso de implementación</h2>
                </motion.div>

                <div className="sd-process__timeline">
                    {service.process.map((step, i) => (
                        <motion.div
                            key={step}
                            className="sd-process__step"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <div className="sd-process__step-num">
                                <span>{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="sd-process__step-line" />
                            <div className="sd-process__step-content">
                                <p>{step}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Insight Section */}
            <motion.section
                className="sd-insight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6 }}
            >
                <div className="sd-insight__icon">
                    <Lightbulb size={24} strokeWidth={1.5} />
                </div>
                <blockquote className="sd-insight__quote">
                    &ldquo;{service.insight}&rdquo;
                </blockquote>
            </motion.section>

            {/* Navigation between services */}
            <section className="sd-nav">
                <div className="sd-nav__inner">
                    {prevService ? (
                        <Link to={`/servicios/${prevService.id}`} className="sd-nav__link sd-nav__link--prev">
                            <ArrowLeft size={16} />
                            <div>
                                <span className="sd-nav__label">Anterior</span>
                                <span className="sd-nav__name">{prevService.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextService ? (
                        <Link to={`/servicios/${nextService.id}`} className="sd-nav__link sd-nav__link--next">
                            <div>
                                <span className="sd-nav__label">Siguiente</span>
                                <span className="sd-nav__name">{nextService.title}</span>
                            </div>
                            <ArrowUpRight size={16} />
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </section>

            {/* CTA Final */}
            <motion.section
                className="sd-cta"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="sd-cta__title">
                    ¿Listo para impulsar tu negocio<br />
                    <span>con {service.title.toLowerCase()}?</span>
                </h2>
                <p className="sd-cta__desc">
                    Cada uno de estos servicios cumple un rol dentro de un sistema más grande.
                    Cuando trabajan en conjunto, se convierten en un motor de crecimiento.
                </p>
                <a href="https://calendly.com/eccomfy" target="_blank" rel="noopener noreferrer" className="sd-cta__btn">
                    Empezar proyecto <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>
            </motion.section>
        </div>
    );
};
