import { useState, useEffect } from "react";
import logo from "../assets/logo sin fondo.png";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Servicios", href: "#services" },
    { name: "Proyectos", href: "#projects" },
    { name: "Nosotros", href: "#about" },
    { name: "Blog", href: "#blog" },
];

export default function Navbar({ startAnimation = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("Inicio");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -120 }}
                animate={{ y: startAnimation ? 0 : -120 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`
          fixed top-0 left-0 right-0 z-50
          bg-white
          transition-all duration-500
          ${scrolled
                        ? "py-3 shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-gray-100"
                        : "py-5"}
        `}
            >
                {/* Línea verde superior sutil */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#24c78f]/50 to-transparent" />

                <div className="max-w-[1500px] mx-auto px-8 flex items-center justify-between">

                    {/* ── Logo ── */}
                    <a href="#" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 rounded-full bg-[#24c78f]/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition duration-500" />
                            <img
                                src={logo}
                                alt="Eccomfy"
                                className="h-12 w-auto relative z-10"
                            />
                        </motion.div>

                        <span
                            className="text-2xl font-black tracking-tight text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(135deg, #111, #24c78f)" }}
                        >
                            Eccomfy
                        </span>
                    </a>

                    {/* ── Desktop links ── */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = active === link.name;
                            return (
                                <button
                                    key={link.name}
                                    onClick={() => setActive(link.name)}
                                    className="relative text-[15px] font-semibold transition-colors duration-200"
                                    style={{ color: isActive ? "#24c78f" : "rgba(30,30,30,0.65)" }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#24c78f] rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}

                        {/* CTA */}
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.97 }}
                            className="ml-4 px-7 py-3 rounded-full text-[15px] font-bold text-white relative overflow-hidden group"
                            style={{
                                background: "linear-gradient(135deg, #1b9e72, #24c78f, #5feab6)",
                                boxShadow: "0 0 24px rgba(36,199,143,0.35)",
                            }}
                        >
                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-600 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                            <span className="relative flex items-center gap-2">
                                Empezar Proyecto
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.a>
                    </div>

                    {/* ── Mobile button ── */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-gray-700 hover:text-[#24c78f] transition-colors"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </motion.nav>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => { setActive(link.name); setIsOpen(false); }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.07 }}
                                className="text-3xl font-bold text-gray-800 hover:text-[#24c78f] transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.55 }}
                            onClick={() => setIsOpen(false)}
                            className="mt-6 px-10 py-4 rounded-full text-lg font-bold text-white"
                            style={{
                                background: "linear-gradient(135deg, #1b9e72, #24c78f, #5feab6)",
                                boxShadow: "0 0 40px rgba(36,199,143,0.4)",
                            }}
                        >
                            Empezar Ahora
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
