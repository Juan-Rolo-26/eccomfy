import { useState, useEffect } from 'react';

export const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

        syncPreference();

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', syncPreference);
            return () => mediaQuery.removeEventListener('change', syncPreference);
        }

        // fallback for older browsers
        mediaQuery.addListener(syncPreference);
        return () => mediaQuery.removeListener(syncPreference);
    }, []);

    return prefersReducedMotion;
};
