import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './Process.css';

const STEPS = [
  {
    number: '01',
    title: 'Descubrimiento',
    desc: 'Analizamos tu negocio a fondo para detectar oportunidades reales de crecimiento y puntos críticos que hoy están frenando tus resultados.',
    tags: ['Auditoría', 'Research', 'Brief'],
  },
  {
    number: '02',
    title: 'Estrategia',
    desc: 'Creamos un sistema claro y medible para escalar: canales, mensajes y decisiones alineadas a resultados concretos.',
    tags: ['Roadmap', 'KPIs', 'Posicionamiento'],
  },
  {
    number: '03',
    title: 'Diseño',
    desc: 'Diseñamos experiencias que transmiten autoridad, generan confianza y convierten visitantes en clientes.',
    tags: ['UI/UX', 'Branding', 'Prototipo'],
  },
  {
    number: '04',
    title: 'Desarrollo',
    desc: 'Construimos plataformas rápidas, optimizadas y listas para escalar. Cada detalle está pensado para convertir.',
    tags: ['Web', 'Performance', 'SEO técnico'],
  },
  {
    number: '05',
    title: 'Escalado',
    desc: 'Optimizamos continuamente lo que funciona para multiplicar resultados y llevar tu negocio al siguiente nivel.',
    tags: ['Analytics', 'Iteración', 'Growth'],
  },
] as const;

type Step = (typeof STEPS)[number];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(index === 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.55 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`pc ${active ? 'pc--active' : ''}`}
      style={{ '--delay': `${index * 0.1}s` } as CSSProperties}
    >
      <div className="pc__ghost">{step.number}</div>

      <div className="pc__content">
        <span className="pc__num">{step.number}</span>

        <h3 className="pc__title">{step.title}</h3>

        <p className="pc__desc">{step.desc}</p>

        <ul className="pc__tags">
          {step.tags.map((t, i) => (
            <li key={t} style={{ '--i': i } as CSSProperties} className="pc__tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export const Process = () => {
  return (
    <section className="process" id="proceso">
      <div className="process__inner">
        <header className="process__header">
          <span className="process__eyebrow">Cómo trabajamos</span>

          <h2 className="process__title">
            Un proceso pensado <br />
            para hacerte <span>crecer.</span>
          </h2>
        </header>

        <div className="process__timeline">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
