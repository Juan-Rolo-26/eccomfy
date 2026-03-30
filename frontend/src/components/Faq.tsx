import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import './Faq.css';

const FAQ_DATA = [
    {
        question: '¿En qué se diferencian de una agencia tradicional?',
        answer: 'No vendemos "posteos", "likes" o "sitios web" aislados. Construimos ecosistemas digitales completos (Sistemas de Ventas) pensados exclusivamente para generar retorno de inversión (ROI). Nos enfocamos en las métricas de negocio reales: facturación, costo de adquisición y ganancias.'
    },
    {
        question: '¿Cuánto tiempo tardan en implementar el sistema?',
        answer: 'Dependiendo del punto de partida de tu negocio y la complejidad del ecosistema a construir, la fase inicial de diagnóstico y armado suele tomar entre 3 a 5 semanas. A partir de ahí, activamos las campañas para empezar a iterar con datos reales y ver resultados rápidamente.'
    },
    {
        question: '¿Necesito tener mi propia página web o redes sociales activas?',
        answer: 'No es un requisito obligatorio. Podemos construir toda tu presencia digital desde cero si es necesario, o potenciar y reestructurar los elementos que ya tenés (si consideramos que son viables y estratégicos).'
    },
    {
        question: '¿Tienen permanencia o contratos de largo plazo?',
        answer: 'No forzamos contratos anuales que te obliguen a quedarte si no estás contento. Nuestro esquema de trabajo se basa en un fee de despliegue inicial (Setup) y luego un modelo mensual con el cual buscamos ser elegidos mes a mes mediante la entrega de resultados.'
    },
    {
        question: '¿Garantizan resultados, ventas o leads?',
        answer: 'Quien te garantice una cantidad exacta de ventas el primer mes en marketing digital, te está mintiendo. Lo que garantizamos es la ejecución perfecta de una metodología probada, con un enfoque absoluto en optimizar día a día para que tu costo por conversión baje y tus márgenes de rentabilidad escalen.'
    }
];

export const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(current => current === index ? null : index);
    };

    const formatNumber = (num: number) => String(num + 1).padStart(2, '0');

    return (
        <section id="faq" className="faq-section">
            <div className="faq-container">

                {/* Header */}
                <div className="faq-header">
                    <motion.span
                        className="faq-eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Preguntas Frecuentes
                    </motion.span>
                    <motion.h2
                        className="faq-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Respuestas claras para<br />
                        <span className="faq-highlight">decisiones seguras.</span>
                    </motion.h2>
                </div>

                {/* Accordion */}
                <div className="faq-layout">
                    <div className="faq-list">
                        {FAQ_DATA.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.07 }}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => toggle(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="faq-number">{formatNumber(index)}</span>
                                        <span className="faq-question-text">{item.question}</span>
                                        <div className="faq-icon">
                                            <Plus size={16} />
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                className="faq-answer-wrapper"
                                            >
                                                <div className="faq-answer">
                                                    <p>{item.answer}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
