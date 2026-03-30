import { motion } from 'framer-motion';
import { type CSSProperties } from 'react';
import './Process.css';

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    desc: 'Auditamos el negocio completo para entender exactamente dónde se está perdiendo dinero y qué frena tu crecimiento. Nos enfocamos en analizar a fondo tu producto, validar la demanda real y detectar los cuellos de botella en tu embudo. Recuerda que el problema casi nunca es la falta de tráfico, sino tener un sistema que no convierte adecuadamente.',
    color: 'var(--secondary)',
  },
  {
    number: '02',
    title: 'Estrategia',
    desc: 'Diseñamos un sistema de ventas claro y estructurado que define exactamente cómo tu negocio va a generar ingresos de forma consistente. Aterrizamos la propuesta de valor y definimos al cliente ideal para crear un embudo de ventas que realmente funcione. Porque si no está definido cómo entra el dinero, no hay un sistema real, solo improvisación.',
    color: 'var(--primary)',
  },
  {
    number: '03',
    title: 'Construcción',
    desc: 'Creamos todos los activos digitales y plataformas necesarias para atraer, convencer de manera persuasiva y convertir visitantes en clientes. Desde landing pages optimizadas hasta un copywriting que conecte directo con tu audiencia. Cada elemento que construimos tiene una misión clave: captar la atención, generar confianza absoluta y finalmente cerrar la venta.',
    color: 'var(--secondary)',
  },
  {
    number: '04',
    title: 'Lanzamiento',
    desc: 'Activamos el nuevo ecosistema y comenzamos a generar tráfico altamente calificado para validar los resultados y ajustar la estrategia rápidamente. Configuramos los sistemas de rastreo y lanzamos campañas tácticas para recopilar métricas accionables constantes. En esta fase no buscamos la supuesta perfección, sino obtener información cruda del mercado para mejorar.',
    color: 'var(--primary)',
  },
  {
    number: '05',
    title: 'Optimización y Escala',
    desc: 'Analizamos los datos recabados, mejoramos cada porcentaje de conversión y comenzamos a escalar el sistema para multiplicar tus resultados sostenidamente. Implementamos estrategias de retargeting y automatizamos las ventas ya probadas. Porque escalar dejándose llevar por intuición es apostar, pero escalar guiándose con datos duros es construir un negocio sólido.',
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
            initial={{ opacity: 0, x: -40 }}
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
              paso a paso, asegurándonos de que cada decisión tenga un impacto real
              en tus ventas.
            </p>


          </motion.div>
        </div>

        {/* Lado Derecho: Stacking Cards */}
        <div className="process__right">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="pc-card"
              style={{ '--i': i } as CSSProperties}
            >
              {/* Colored top accent */}
              <div
                className="pc-card__top-glow"
                style={{ background: `linear-gradient(90deg, ${step.color} 0%, transparent 60%)` }}
              />

              <div className="pc-card__inner">
                {/* Header row */}
                <div className="pc-card__header">
                  <div className="pc-card__header-left">
                    <span className="pc-card__num">Fase {step.number}</span>
                    <h3 className="pc-card__title">{step.title}</h3>
                  </div>
                  <span className="pc-card__step-bg">{step.number}</span>
                </div>

                <p className="pc-card__desc">{step.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
