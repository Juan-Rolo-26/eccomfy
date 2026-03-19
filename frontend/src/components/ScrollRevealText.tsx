import { useRef, useState } from 'react';
import {
    motion,
    type MotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    AnimatePresence
} from 'framer-motion';

import img1 from '../assets/ecosistema.png';
import img2 from '../assets/automatizaciones.png';
import img3 from '../assets/crecimiento.png';

const MotionSpan = motion.span;

const PARAGRAPH =
    'Más que una simple agencia, somos arquitectos de tu propio ecosistema de ventas digital. Construimos plataformas sólidas, automatizaciones fluidas y herramientas inteligentes que convierten cada clic en una oportunidad, logrando multiplicar tus resultados de manera medible e imparable.';

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

    const revealProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useMotionValueEvent(revealProgress, "change", (latest) => {
        if (latest < 0.33) {
            setCurrentImageIndex(0);
        } else if (latest < 0.66) {
            setCurrentImageIndex(1);
        } else {
            setCurrentImageIndex(2);
        }
    });

    if (shouldReduceMotion) {
        return (
            <section id="nosotros" className="srt">
                <div className="srt__inner">
                    <div className="srt__content">
                        <span className="srt__label">Nuestra filosofía</span>
                        <p className="srt__text srt__text--static">{PARAGRAPH}</p>
                    </div>
                    <div className="srt__visuals">
                        <img
                            src={IMAGES[0].src}
                            alt={IMAGES[0].alt}
                            className="srt__image"
                            style={{ opacity: 1 }}
                        />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div ref={container} style={{ minHeight: '250vh', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <section id="nosotros" className="srt" style={{ width: '100%', height: '100%' }}>
                    <div className="srt__inner">
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

                        <div className="srt__visuals">
                            <AnimatePresence>
                                <motion.img
                                    key={IMAGES[currentImageIndex].id}
                                    src={IMAGES[currentImageIndex].src}
                                    alt={IMAGES[currentImageIndex].alt}
                                    className="srt__image"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
