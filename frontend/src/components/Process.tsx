import { motion } from 'framer-motion';
import { type CSSProperties } from 'react';
import './Process.css';

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    desc: 'Auditamos el negocio completo para entender dónde se está perdiendo dinero y qué está frenando el crecimiento.',
    insight: '👉 El problema casi nunca es la falta de tráfico, sino un sistema que no convierte.',
    tags: [
      'Análisis de producto y oferta',
      'Validación de demanda',
      'Benchmark de competencia',
      'Auditoría de funnel',
      'Detección de cuellos de botella',
    ],
    color: 'var(--primary)',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Estrategia',
    desc: 'Diseñamos un sistema de ventas claro y escalable que define cómo el negocio va a generar ingresos de forma consistente.',
    insight: '👉 Si no está definido cómo entra la plata, no hay sistema: hay improvisación.',
    tags: [
      'Definición de cliente ideal',
      'Propuesta de valor',
      'Estructura de oferta',
      'Embudo de ventas',
      'Selección de canales',
    ],
    color: 'var(--secondary)',
    icon: '🎯',
  },
  {
    number: '03',
    title: 'Construcción',
    desc: 'Creamos todos los activos digitales necesarios para atraer, convencer y convertir clientes.',
    insight: '👉 Cada elemento tiene una función: captar atención, generar confianza o cerrar la venta.',
    tags: [
      'Landing pages optimizadas',
      'Tienda / ecommerce',
      'Copywriting persuasivo',
      'Creatividades publicitarias',
      'Automatizaciones',
    ],
    color: 'var(--accent)',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Lanzamiento',
    desc: 'Activamos el sistema y comenzamos a generar tráfico calificado para validar y ajustar rápidamente.',
    insight: '👉 No se busca perfección, se busca información real para mejorar.',
    tags: [
      'Activación de campañas',
      'Configuración de tracking',
      'Testeo A/B',
      'Optimización temprana',
    ],
    color: 'var(--primary)',
    icon: '🚀',
  },
  {
    number: '05',
    title: 'Optimización y Escala',
    desc: 'Analizamos datos, optimizamos lo que funciona y escalamos el sistema para multiplicar resultados.',
    insight: '👉 Escalar sin datos es apostar. Escalar con datos es construir.',
    tags: [
      'Análisis de métricas (KPIs)',
      'Optimización de conversión (CRO)',
      'Escalado de campañas',
      'Retargeting',
      'Automatización avanzada',
    ],
    color: 'var(--secondary)',
    icon: '📈',
  },
] as const;

export const Process = () => {
  return (
    <section className="process" id="proceso">
      <div className="process__container">

        {/* Lado Izquierdo: Sticky Header */}
        <div className="process__left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="process__header"
          >
            <span className="process__eyebrow">Nuestra metodología</span>
            <h2 className="process__title">
              Fases de
              <br />
              <span className="gradient-text">crecimiento.</span>
            </h2>
            <p className="process__subtitle">
              No hacemos webs por hacer. Construimos activos digitales escalables,
              paso a paso, asegurándonos de que cada decisión de diseño o código
              tenga un impacto real en tus ventas.
            </p>

            {/* Progress indicator */}
            <div className="process__progress">
              {STEPS.map((step) => (
                <div key={step.number} className="process__progress-dot">
                  <span className="process__progress-label">{step.number}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lado Derecho: Stacking Cards */}
        <div className="process__right">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="pc-card"
              style={{ '--i': i } as CSSProperties}
            >
              {/* Línea colorida sutil corporativa en el tope */}
              <div
                className="pc-card__top-glow"
                style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
              />

              <div className="pc-card__inner">
                <div className="pc-card__header">
                  <div className="pc-card__icon-wrapper">
                    <span className="pc-card__icon">{step.icon}</span>
                  </div>
                  <div className="pc-card__header-text">
                    <span className="pc-card__num">{step.number}</span>
                    <h3 className="pc-card__title">{step.title}</h3>
                  </div>
                </div>

                <p className="pc-card__desc">{step.desc}</p>

                <div className="pc-card__tags">
                  {step.tags.map((tag) => (
                    <span key={tag} className="pc-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pc-card__insight">
                  <div className="pc-card__insight-bar" style={{ background: step.color }} />
                  <div className="pc-card__insight-content">
                    <span className="pc-card__insight-label">Insight clave</span>
                    <p>{step.insight}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
