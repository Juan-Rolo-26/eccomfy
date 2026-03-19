import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RotatingText from "./RotatingText";

const TEXTS = [
    "Marketing Digital",
    "Publicidad Online",
    "Branding Estratégico",
    "Desarrollo Web",
    "SEO & Performance",
];

export default function HeroAnimated({ startAnimation = false }) {
    return (
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* ─── Fondo oscuro premium ─────────────────────────── */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 25% 30%, rgba(36,199,143,0.12), transparent 50%)," +
                        "radial-gradient(circle at 75% 75%, rgba(94,234,184,0.08), transparent 60%)," +
                        "linear-gradient(160deg, #020806 0%, #03100b 55%, #020806 100%)",
                }}
            />


            {/* ── Orbs animados en movimiento ─────────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Orb 1 — verde principal */}
                <motion.div
                    className="absolute rounded-full blur-[130px] opacity-25"
                    style={{
                        width: 580, height: 580,
                        background: "radial-gradient(circle, rgba(36,199,143,0.55), transparent 70%)",
                    }}
                    animate={{ x: ["-15%", "55%", "20%", "-15%"], y: ["5%", "40%", "70%", "5%"] }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                />
                {/* Orb 2 — teal claro, movimiento inverso */}
                <motion.div
                    className="absolute rounded-full blur-[160px] opacity-[0.18]"
                    style={{
                        width: 480, height: 480,
                        background: "radial-gradient(circle, rgba(94,234,184,0.5), transparent 70%)",
                    }}
                    animate={{ x: ["80%", "15%", "60%", "80%"], y: ["55%", "10%", "40%", "55%"] }}
                    transition={{ duration: 19, repeat: Infinity, ease: "linear", delay: 3 }}
                />
                {/* Orb 3 — verde oscuro, central sutil */}
                <motion.div
                    className="absolute rounded-full blur-[100px] opacity-20"
                    style={{
                        width: 340, height: 340,
                        background: "radial-gradient(circle, rgba(27,158,114,0.6), transparent 70%)",
                    }}
                    animate={{ x: ["40%", "68%", "18%", "40%"], y: ["30%", "65%", "12%", "30%"] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 7 }}
                />
            </div>


            {/* ─── Contenido centrado ──────────────────────────── */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ duration: 0.7 }}
                    className="mb-10"
                >
                    <span
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase"
                        style={{
                            border: "1px solid rgba(36,199,143,0.25)",
                            background: "rgba(36,199,143,0.06)",
                            color: "rgba(255,255,255,0.55)",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#24c78f] animate-pulse" />
                        Agencia de Marketing Digital en Córdoba
                    </span>
                </motion.div>

                {/* H1 SEO estático */}
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="font-black leading-[0.95] tracking-tight text-white"
                    style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
                >
                    Impulsamos tu negocio con
                </motion.h1>

                {/* ─── RotatingText ───────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.75, delay: 0.2 }}
                    className="mt-3 flex justify-center"
                >
                    <RotatingText
                        texts={TEXTS}
                        mainClassName="hero-rotating font-black tracking-tight justify-center"
                        splitLevelClassName="overflow-hidden pb-1"
                        staggerFrom="last"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2400}
                        style={{ fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)", lineHeight: 1.05 }}
                    />
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.05]"
                        style={{
                            background: "linear-gradient(135deg, #1b9e72, #24c78f, #5feab6)",
                            boxShadow: "0 0 35px rgba(36,199,143,0.4)",
                        }}
                    >
                        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="relative">Solicitar propuesta</span>
                        <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="#projects"
                        className="inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/6"
                        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                    >
                        Ver proyectos
                    </a>
                </motion.div>

            </div>

            {/* Fade inferior */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 w-full h-28"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(2,8,6,0.9))" }}
            />
        </header>
    );
}
