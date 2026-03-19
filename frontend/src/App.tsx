import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './index.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealText } from './components/ScrollRevealText';
import { VideoShowcase } from './components/VideoShowcase';
import { Features } from './components/Features';
import { CircularReveal } from './components/CircularReveal';
import { Process } from './components/Process';
import { WaveBackground } from './components/WaveBackground';
import { Footer } from './components/Footer';
import { StackingWrapper } from './components/StackingWrapper';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

const WAVE_STATS = [
  { value: 30, label: 'Proyectos desarrollados', suffix: '' },
  { value: 85, label: 'Mejora en conversión', suffix: '%' },
  { value: 60, label: 'Aumento en leads', suffix: '%' },
  { value: 90, label: 'Clientes satisfechos', suffix: '%' },
] as const;

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

type WaveStatProps = {
  index: number;
  label: string;
  value: number;
  suffix?: string;
  reducedMotion: boolean;
};

const WaveStat = ({
  index,
  label,
  value,
  suffix = '',
  reducedMotion,
}: WaveStatProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 1400;
    const delay = index * 140;

    const timeoutId = window.setTimeout(() => {
      const tick = (time: number) => {
        if (startTime === 0) startTime = time;

        const progress = Math.min((time - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        setDisplayValue(Math.round(value * easedProgress));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [hasStarted, index, reducedMotion, value]);

  return (
    <div ref={ref} className="wave-stat">
      <span className="wave-stat__num" aria-label={`${label}: +${value}${suffix} `}>
        +<span>{displayValue}</span>
        {suffix}
      </span>
      <span className="wave-stat__label">{label}</span>
    </div>
  );
};

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="app-container" style={{ background: '#080808' }}>
      <Navbar />

      <StackingWrapper zIndex={1}>
        <Hero />
      </StackingWrapper>

      <StackingWrapper zIndex={2} overlayColor="#080808">
        <ScrollRevealText />
      </StackingWrapper>

      <StackingWrapper zIndex={3}>
        <div style={{ background: '#08111d' }}>
          <CircularReveal
            bottom={<VideoShowcase />}
            top={<Features />}
          />
        </div>
      </StackingWrapper>

      <StackingWrapper zIndex={4}>
        <div style={{ background: '#080808' }}>
          <Process />
        </div>
      </StackingWrapper>

      <StackingWrapper zIndex={5}>
        <section className="wave-section" style={{ background: '#080808' }}>
          <div className="wave-background-wrapper">
            <WaveBackground />

            <div className="wave-content">
              <h2 className="wave-tagline">
                Resultados que se<br />
                <span>miden, no se prometen.</span>
              </h2>

              <div className="wave-stats">
                {WAVE_STATS.map((stat, index) => (
                  <WaveStat
                    key={stat.label}
                    index={index}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    reducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>

              <a href="#contacto" className="wave-cta">
                Empezar ahora <ArrowUpRight size={16} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </section>
      </StackingWrapper>

      <div style={{ position: 'relative', zIndex: 6, background: '#08111d' }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
