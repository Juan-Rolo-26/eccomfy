import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./RotatingText.css";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function RotatingText({
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    style,
    ...rest
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    /* ── split text into chars / words / lines ── */
    const splitIntoChars = (text) => {
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
            return Array.from(seg.segment(text), (s) => s.segment);
        }
        return Array.from(text);
    };

    const elements = useMemo(() => {
        const text = texts[currentIndex];
        if (splitBy === "characters") {
            return text.split(" ").map((word, i, arr) => ({
                characters: splitIntoChars(word),
                needsSpace: i !== arr.length - 1,
            }));
        }
        if (splitBy === "words") {
            return text.split(" ").map((word, i, arr) => ({
                characters: [word],
                needsSpace: i !== arr.length - 1,
            }));
        }
        return text.split("\n").map((line, i, arr) => ({
            characters: [line],
            needsSpace: i !== arr.length - 1,
        }));
    }, [texts, currentIndex, splitBy]);

    /* ── stagger ── */
    const getDelay = useCallback((idx, total) => {
        if (staggerFrom === "first") return idx * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - idx) * staggerDuration;
        if (staggerFrom === "center") return Math.abs(Math.floor(total / 2) - idx) * staggerDuration;
        return idx * staggerDuration;
    }, [staggerFrom, staggerDuration]);

    /* ── navigation ── */
    const next = useCallback(() => {
        setCurrentIndex((i) => {
            const n = i === texts.length - 1 ? (loop ? 0 : i) : i + 1;
            if (onNext) onNext(n);
            return n;
        });
    }, [texts.length, loop, onNext]);

    useEffect(() => {
        if (!auto) return;
        const id = setInterval(next, rotationInterval);
        return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    /* ── render ── */
    return (
        <span className={cn("text-rotate", mainClassName)} style={style} {...rest}>
            <span className="text-rotate-sr-only">{texts[currentIndex]}</span>
            <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                <span key={currentIndex} className="text-rotate" aria-hidden="true">
                    {elements.map((wordObj, wordIndex, arr) => {
                        const prevCount = arr.slice(0, wordIndex).reduce((s, w) => s + w.characters.length, 0);
                        const total = arr.reduce((s, w) => s + w.characters.length, 0);
                        return (
                            <span key={wordIndex} className={cn("text-rotate-word", splitLevelClassName)}>
                                {wordObj.characters.map((char, ci) => (
                                    <motion.span
                                        key={ci}
                                        initial={initial}
                                        animate={animate}
                                        exit={exit}
                                        transition={{ ...transition, delay: getDelay(prevCount + ci, total) }}
                                        className={cn("text-rotate-element", elementLevelClassName)}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
                            </span>
                        );
                    })}
                </span>
            </AnimatePresence>
        </span>
    );
}
