import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import './Navbar.css';

const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "FAQ", href: "#faq" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("Servicios");
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [logoHovered, setLogoHovered] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 15);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handleNavigate = (name: string, href: string) => {
        if (name) setActive(name);
        setIsOpen(false);

        // If we're not on the home page, navigate there first
        if (location.pathname !== '/') {
            navigate('/' + href);
            return;
        }

        const target = href === "#inicio" ? document.body : document.querySelector(href);
        setTimeout(() => {
            target?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    // Determina qué link tiene el underline (hover tiene prioridad)
    const underlineTarget = hoveredLink || active;

    const logoText = "Eccomfy";

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`nv ${scrolled ? "nv--scrolled" : ""}`}
            >
                <div className="nv__inner">

                    {/* ── Lado Izquierdo: Links con underline en hover ── */}
                    <div className="nv__left">
                        <div className="nv__desktop-links">
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => handleNavigate(link.name, link.href)}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className={`nv__link ${active === link.name ? "nv__link--active" : ""}`}
                                >
                                    {link.name}
                                    {/* Underline fluido que sigue al hover o al activo */}
                                    {underlineTarget === link.name && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="nv__link-underline"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* ── Centro: Logo con texto "eccomfy" en hover ── */}
                    <div className="nv__center">
                        <motion.button
                            onMouseEnter={() => setLogoHovered(true)}
                            onMouseLeave={() => setLogoHovered(false)}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigate("Inicio", "#inicio")}
                            className="nv__logo-container"
                            aria-label="Inicio"
                        >
                            <motion.img
                                src={logo}
                                alt="Eccomfy"
                                className="nv__logo-img"
                                animate={{ scale: logoHovered ? 1.08 : 1 }}
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />

                            {/* Texto "Eccomfy" siempre visible */}
                            <span className="nv__logo-text" aria-hidden="true">
                                {logoText}
                            </span>
                        </motion.button>
                    </div>

                    {/* ── Lado Derecho: CTA con underline + Hamburguesa ── */}
                    <div className="nv__right">
                        <motion.button
                            onClick={() => handleNavigate("Contacto", "#contacto")}
                            className="nv__cta"
                        >
                            <span className="nv__cta-inner">
                                <span className="nv__cta-text">Empezar proyecto</span>
                                <motion.span
                                    className="nv__cta-icon"
                                    whileHover={{ rotate: 45 }}
                                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                                >
                                    <ArrowUpRight size={18} strokeWidth={2.5} />
                                </motion.span>
                            </span>
                            <span className="nv__cta-underline" />
                        </motion.button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`nv__burger-btn ${isOpen ? 'nv__burger-btn--open' : ''}`}
                            aria-label="Menú"
                        >
                            <span className="nv__burger-line nv__burger-line-1" />
                            <span className="nv__burger-line nv__burger-line-2" />
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* ── Mobile Overlay ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                        exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="nv-mobile"
                    >
                        <div className="nv-mobile__content">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <button
                                        onClick={() => handleNavigate(link.name, link.href)}
                                        className="nv-mobile__link"
                                    >
                                        {link.name}
                                    </button>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <button
                                    onClick={() => handleNavigate("Contacto", "#contacto")}
                                    className="nv-mobile__link nv-mobile__link--cta"
                                >
                                    Contacto
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};