import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.png';

const NAV_LINKS = [
    { href: '#nosotros',  label: 'Nosotros'  },
    { href: '#servicios', label: 'Servicios' },
    { href: '#proyectos', label: 'Proyectos' },
];

const MENU_LINKS = [
    { href: '#inicio',   label: 'Inicio',    num: '01' },
    { href: '#nosotros', label: 'Nosotros',  num: '02' },
    { href: '#servicios',label: 'Servicios', num: '03' },
    { href: '#proyectos',label: 'Proyectos', num: '04' },
    { href: '#faq',      label: 'FAQ',       num: '05' },
    { href: '#contacto', label: 'Contacto',  num: '06' },
];

const SOCIALS = [
    { href: 'https://www.instagram.com/eccomfy', label: 'Instagram' },
    { href: 'https://www.linkedin.com/company/eccomfy', label: 'LinkedIn' },
    { href: 'mailto:eccomfyarg@gmail.com', label: 'Email' },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        timerRef.current = window.setTimeout(() => setVisible(true), 80);
        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navigate = (href: string) => {
        setMenuOpen(false);
        window.setTimeout(() => {
            if (href === '#inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const el = document.querySelector<HTMLElement>(href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 340);
    };

    return (
        <>
            {/* ── Bar ── */}
            <nav className={[
                'nb',
                scrolled  ? 'nb--scrolled'  : '',
                menuOpen  ? 'nb--open'       : '',
                visible   ? 'nb--visible'    : '',
            ].join(' ')}>
                <div className="nb__inner">

                    {/* left links */}
                    <ul className="nb__links">
                        {NAV_LINKS.map((l) => (
                            <li key={l.href}>
                                <button type="button" className="nb__link" onClick={() => navigate(l.href)}>
                                    {l.label}
                                    <span className="nb__link-line" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* center logo */}
                    <button type="button" className="nb__logo" onClick={() => navigate('#inicio')} aria-label="Inicio">
                        <img src={logo} alt="Eccomfy" />
                        <span className="nb__logo-name" aria-hidden="true">eccomfy</span>
                    </button>

                    {/* right */}
                    <div className="nb__right">
                        <button type="button" className="nb__cta" onClick={() => navigate('#contacto')}>
                            Empezar proyecto
                            <span className="nb__cta-arrow" aria-hidden="true">
                                <ArrowUpRight size={15} strokeWidth={2.2} />
                            </span>
                        </button>

                        <button
                            type="button"
                            className="nb__burger-btn"
                            onClick={() => setMenuOpen((p) => !p)}
                            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={menuOpen}
                        >
                            <span className={`nb__burger ${menuOpen ? 'nb__burger--open' : ''}`}>
                                <span className="nb__burger-top" />
                                <span className="nb__burger-mid" />
                                <span className="nb__burger-bot" />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Full-screen overlay ── */}
            <div className={`nb__overlay ${menuOpen ? 'nb__overlay--open' : ''}`} aria-hidden={!menuOpen}>

                {/* overlay header */}
                <div className="nb__ov-top">
                    <button type="button" className="nb__logo nb__logo--white" onClick={() => navigate('#inicio')}>
                        <img src={logo} alt="Eccomfy" />
                        <span className="nb__logo-name" aria-hidden="true">eccomfy</span>
                    </button>
                    <button type="button" className="nb__ov-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar">
                        <span className="nb__burger nb__burger--open">
                            <span className="nb__burger-top" />
                            <span className="nb__burger-mid" />
                            <span className="nb__burger-bot" />
                        </span>
                    </button>
                </div>

                {/* big links */}
                <nav className="nb__ov-nav">
                    {MENU_LINKS.map((l, i) => (
                        <button
                            type="button"
                            key={l.href}
                            className="nb__ov-link"
                            style={{ '--i': i } as CSSProperties}
                            onClick={() => navigate(l.href)}
                        >
                            <span className="nb__ov-num">{l.num}</span>
                            <span className="nb__ov-label">{l.label}</span>
                            <ArrowUpRight className="nb__ov-arrow" size={28} strokeWidth={1.4} />
                        </button>
                    ))}
                </nav>

                {/* bottom bar */}
                <div className="nb__ov-footer">
                    <span className="nb__ov-copy">© 2026 Eccomfy</span>
                    <div className="nb__ov-socials">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                                className="nb__ov-social"
                            >
                                {s.label} <ArrowUpRight size={13} strokeWidth={2} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* decorative noise */}
                <div className="nb__ov-noise" aria-hidden="true" />
            </div>
        </>
    );
};
