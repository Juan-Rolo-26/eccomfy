import { useState, useEffect } from "react";
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
        const target = href === "#inicio" ? document.body : document.querySelector(href);
        setTimeout(() => {
            target?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`nv ${scrolled ? "nv--scrolled" : ""}`}
            >
                <div className="nv__inner">

                    {/* ── Lado Izquierdo: Links Animados ── */}
                    <div className="nv__left">
                        <div className="nv__desktop-links">
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.name}
                                    whileHover={{ y: -2 }}
                                    onClick={() => handleNavigate(link.name, link.href)}
                                    className={`nv__link ${active === link.name ? "nv__link--active" : ""}`}
                                >
                                    {link.name}
                                    {/* Subrayado fluido con Framer Motion */}
                                    {active === link.name ? (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="nv__link-underline"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    ) : null}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* ── Centro: Logo ── */}
                    <div className="nv__center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            onClick={() => handleNavigate("Inicio", "#inicio")}
                            className="nv__logo-container"
                            aria-label="Inicio"
                        >
                            <img src={logo} alt="Eccomfy" className="nv__logo-img" />
                        </motion.button>
                    </div>

                    {/* ── Lado Derecho: CTA y Hamburguesa ── */}
                    <div className="nv__right">
                        <motion.button
                            whileHover={{ x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigate("Contacto", "#contacto")}
                            className="nv__cta"
                        >
                            Empezar proyecto
                            <motion.span
                                whileHover={{ rotate: 45, x: 2, y: -2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <ArrowUpRight size={18} strokeWidth={2.5} />
                            </motion.span>
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