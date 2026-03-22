import { motion } from 'framer-motion';
import { type CSSProperties } from 'react';
import './Process.css';

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    desc: 'Analizamos el negocio del cliente a fondo.',
    insight: '👉 Acá detectamos qué está frenando las ventas.',
    tags: ['Producto', 'Mercado', 'Competencia', 'Problemas actuales'],
    color: 'var(--primary)',
  },
  {
    number: '02',
    title: 'Estrategia',
    desc: 'Armamos el plan de crecimiento.',
    insight: '👉 Se diseña cómo va a entrar la plata.',
    tags: ['Definición de público objetivo', 'Propuesta de valor', 'Embudo de ventas', 'Canales a usar'],
    color: 'var(--secondary)',
  },
  {
    number: '03',
    title: 'Construcción',
    desc: 'Creamos todo el sistema.',
    insight: '👉 Se arma el ecosistema completo.',
    tags: ['Landing pages / tienda', 'Creatividades', 'Copywriting', 'Automatizaciones'],
    color: 'var(--accent)',
  },
  {
    number: '04',
    title: 'Lanzamiento',
    desc: 'Ponemos todo a correr.',
    insight: '👉 Empieza a moverse el tráfico y las ventas.',
    tags: ['Activación de campañas', 'Testeo inicial', 'Ajustes rápidos'],
    color: 'var(--primary)',
  },
  {
    number: '05',
    title: 'Optimización y Escala',
    desc: 'Mejoramos y multiplicamos resultados.',
    insight: '👉 Convertimos el sistema en una máquina de ventas.',
    tags: ['Análisis de métricas', 'Optimización de conversiones', 'Escalado de anuncios', 'Automatización avanzada'],
    color: 'var(--secondary)',
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
                style={{ background: step.color }}
              />

              <div className="pc-card__inner">
                <div className="pc-card__header">
                  <span className="pc-card__num">{step.number}</span>
                  <h3 className="pc-card__title">{step.title}</h3>
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
                  {step.insight}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
