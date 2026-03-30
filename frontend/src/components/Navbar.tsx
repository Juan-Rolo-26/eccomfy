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
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handleNavigate = (href: string) => {
        setIsOpen(false);
        if (location.pathname !== "/") {
            navigate("/" + href);
            return;
        }
        const target = href === "#inicio" ? document.body : document.querySelector(href);
        setTimeout(() => target?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`nv ${scrolled ? "nv--scrolled" : ""}`}
            >
                <div className="nv__inner">

                    {/* ── LEFT: Links ── */}
                    <div className="nv__left">
                        <div className="nv__desktop-links">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => handleNavigate(link.href)}
                                    className="nv__link"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {link.name}
                                    <span className="nv__underline" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* ── CENTER: Logo ── */}
                    <motion.button
                        onClick={() => handleNavigate("#inicio")}
                        className="nv__logo"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Inicio"
                    >
                        <motion.img
                            src={logo}
                            alt="Eccomfy"
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        />
                        <span>Eccomfy</span>
                    </motion.button>

                    {/* ── RIGHT: CTA + Burger ── */}
                    <div className="nv__right">
                        <motion.button
                            onClick={() => handleNavigate("#contacto")}
                            className="nv__cta"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Empezar proyecto
                            <span className="nv__cta-icon">
                                <ArrowUpRight size={16} strokeWidth={2.2} />
                            </span>
                            <span className="nv__cta-underline" />
                        </motion.button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`nv__burger ${isOpen ? "open" : ""}`}
                            aria-label="Menú"
                        >
                            <span />
                            <span />
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* ── MOBILE OVERLAY ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                        className="nv-mobile"
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.name}
                                onClick={() => handleNavigate(link.href)}
                                className="nv-mobile__link"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={() => handleNavigate("#contacto")}
                            className="nv-mobile__link"
                            style={{ color: 'var(--secondary)', marginTop: '1rem' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Empezar proyecto
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};