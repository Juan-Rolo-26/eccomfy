import { useState, useEffect } from "react";
import CurtainReveal from "./components/CurtainReveal";
import HeroAnimated from "./components/HeroAnimated";
import Navbar from "./components/Navbar";
import LogoLoop from "./components/LogoLoop";
import {
  SiGoogle, SiMeta, SiInstagram, SiTiktok,
  SiShopify, SiHubspot, SiNotion, SiFigma,
  SiCanva, SiWordpress, SiMailchimp, SiYoutube,
} from "react-icons/si";

const LOGOS = [
  { node: <SiYoutube style={{ color: "#FF0000" }} />, title: "YouTube" },
  { node: <SiMeta style={{ color: "#0082FB" }} />, title: "Meta" },
  { node: <SiInstagram style={{ color: "#E4405F" }} />, title: "Instagram" },
  { node: <SiTiktok style={{ color: "#000000" }} />, title: "TikTok" },
  { node: <SiShopify style={{ color: "#96BF48" }} />, title: "Shopify" },
  { node: <SiHubspot style={{ color: "#FF7A59" }} />, title: "HubSpot" },
  { node: <SiNotion style={{ color: "#111111" }} />, title: "Notion" },
  { node: <SiFigma style={{ color: "#F24E1E" }} />, title: "Figma" },
  { node: <SiCanva style={{ color: "#00C4CC" }} />, title: "Canva" },
  { node: <SiWordpress style={{ color: "#21759B" }} />, title: "WordPress" },
  { node: <SiMailchimp style={{ color: "#FFE01B" }} />, title: "Mailchimp" },
  { node: <SiGoogle style={{ color: "#4285F4" }} />, title: "Google" },
];

export default function App() {
  const [startHero, setStartHero] = useState(false);
  const [removeCover, setRemoveCover] = useState(false);

  useEffect(() => {
    // Sincronizar aparición de contenido con el telón
    // El telón espera 350ms (HOLD_MS) y luego barre.
    // Iniciamos la animación de contenido un poco después del inicio del barrido (ej: 450ms)
    // para que se mueva MIENTRAS se revela.
    const tHack = setTimeout(() => {
      setStartHero(true);
    }, 750);

    // Failsafe absoluto: A los 3.8s quitar el cover si algo falla
    const t = setTimeout(() => {
      setStartHero(true);
      setRemoveCover(true);
    }, 3800);
    return () => {
      clearTimeout(tHack);
      clearTimeout(t);
    };
  }, []);

  const onCurtainSweep = () => {
    // Callback cuando el telón va por el 75% (opcional, ya usamos el timer de arriba para coordinar antes)
    setStartHero(true); // asegurar
    // Dejar que el canvas termine su fade-out visual antes de desmontarlo
    setTimeout(() => setRemoveCover(true), 800);
  };

  return (
    <div className="font-sans antialiased bg-white selection:bg-green-500 selection:text-white">

      {/* Telón líquido de entrada */}
      {!removeCover && <CurtainReveal onDone={onCurtainSweep} />}

      <Navbar startAnimation={startHero} />

      {/* ── Hero oscuro ──────────────────────────────────── */}
      <HeroAnimated startAnimation={startHero} />

      {/* ── Herramientas LogoLoop ─────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
        <p className="text-center text-gray-400 text-xs uppercase tracking-[0.25em] mb-10 font-semibold">
          Herramientas que dominamos
        </p>
        <LogoLoop
          logos={LOGOS}
          speed={80}
          direction="left"
          logoHeight={40}
          gap={64}
          hoverSpeed={20}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Herramientas de marketing digital"
        />
      </section>

      {/* ── Servicios ───────────────────────────────────── */}
      <section id="services" className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#24c78f] mb-4">
              Lo que hacemos
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Servicios digitales para crecer
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Desde la estrategia hasta la ejecución, cubrimos todo el ecosistema digital de tu empresa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📈", title: "Marketing Digital", desc: "Campañas en Meta, Google y TikTok optimizadas para convertir." },
              { icon: "🌐", title: "Desarrollo Web", desc: "Sitios rápidos, modernos y enfocados en la conversión." },
              { icon: "🔍", title: "SEO & Posicionamiento", desc: "Aparecé primero en Google con estrategia de contenidos." },
              { icon: "🎨", title: "Branding", desc: "Identidad visual que diferencia tu marca en el mercado." },
              { icon: "⚙️", title: "Automatización", desc: "Flujos y sistemas que hacen crecer tu negocio en piloto automático." },
              { icon: "📊", title: "Analítica & Datos", desc: "Decisiones basadas en datos, no en intuición." },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#24c78f]/40 hover:shadow-lg hover:shadow-[#24c78f]/5 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#24c78f] transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ───────────────────────────────────── */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Contanos tu proyecto y en 24 hs te enviamos una propuesta personalizada.
          </p>
          <a
            href="mailto:hola@eccomfy.com"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1b9e72, #24c78f, #5feab6)",
              boxShadow: "0 0 40px rgba(36,199,143,0.3)",
            }}
          >
            Iniciar conversación
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-black text-xl text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #1b9e72, #24c78f)" }}
          >
            Eccomfy
          </span>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Eccomfy. Agencia Digital · Córdoba, Argentina.
          </p>
        </div>
      </footer>

    </div>
  );
}
