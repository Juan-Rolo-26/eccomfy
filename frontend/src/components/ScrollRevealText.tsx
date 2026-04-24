import { useRef } from 'react';
import {
    motion,
    type MotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';

import img1 from '../assets/ecosistema.png';
import img2 from '../assets/automatizaciones.png';
import img3 from '../assets/crecimiento.png';

const MotionSpan = motion.span;

const PARAGRAPH =
    "En Eccomfy no somos una simple agencia, somos arquitectos de tu marca personal. Diseñamos ecosistemas digitales para profesionales expertos con +10 años de trayectoria, permitiéndoles desarrollar su propio negocio digital a través de su experiencia y vender sus productos mediante su marca personal.";

const IMAGES = [
    { id: 'img1', src: img1, alt: 'Ecosistema de ventas' },
    { id: 'img2', src: img2, alt: 'Plataformas sólidas' },
    { id: 'img3', src: img3, alt: 'Resultados medibles' }
];

type WordItem = {
    id: string;
    order: number;
    word: string;
};

type WordProps = {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
};

const buildWords = (): WordItem[] => {
    const parts = PARAGRAPH.split(' ');
    const items: WordItem[] = [];
    let cursor = 0;

    for (const word of parts) {
        items.push({
            id: `${cursor}-${word}`,
            order: items.length,
            word,
        });
        cursor += word.length + 1;
    }

    return items;
};

const WORDS = buildWords();

const Word = ({ word, progress, range }: WordProps) => {
    const color = useTransform(progress, range, [
        'rgba(10, 10, 10, 0.14)',
        'rgba(10, 10, 10, 0.94)',
    ]);

    return (
        <MotionSpan
            className="srt__word"
            style={{ color }}
        >
            {word}
        </MotionSpan>
    );
};

export const ScrollRevealText = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const revealProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

    if (shouldReduceMotion) {
        return (
            <section id="nosotros" className="srt">
                <div className="srt__inner">
                    <div className="srt__visuals">
                        <img
                            src={IMAGES[0].src}
                            alt={IMAGES[0].alt}
                            className="srt__image"
                            style={{ opacity: 1 }}
                        />
                    </div>
                    <div className="srt__content">
                        <span className="srt__label">Nuestra filosofía</span>
                        <p className="srt__text srt__text--static">{PARAGRAPH}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div ref={container} style={{ minHeight: '600vh', position: 'relative', background: '#f2f0ea' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <section id="nosotros" className="srt" style={{ width: '100%', height: '100%' }}>
                    <div className="srt__inner">
                        <div className="srt__visuals">
                            <iframe
                                className="srt__image"
                                src="https://www.youtube.com/embed/Ye9sa6Qk1t4?modestbranding=1&rel=0"
                                title="Eccomfy video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: 'none', width: '100%', height: '100%' }}
                            />
                        </div>

                        <div className="srt__content">
                            <span className="srt__label">Nuestra filosofía</span>
                            <p className="srt__text">
                                {WORDS.map((item) => {
                                    const total = WORDS.length;
                                    const start = (item.order / total) * 0.9;
                                    const end = start + 0.1;

                                    return (
                                        <Word
                                            key={item.id}
                                            word={item.word}
                                            progress={revealProgress}
                                            range={[start, end]}
                                        />
                                    );
                                })}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
