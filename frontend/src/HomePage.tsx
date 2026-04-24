import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealText } from './components/ScrollRevealText';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { StackingWrapper } from './components/StackingWrapper';
import { CalendlyButton } from './components/CalendlyButton';
import { SEOHead } from './components/SEOHead';

const homeSchema = [
    {
        "@context": "https://schema.org",
        "@type": ["MarketingAgency", "LocalBusiness"],
        "name": "Ecomfy",
        "description": "Growth Agency especializada en ecosistemas digitales completos para marcas personales, infoproductores y productos digitales en Córdoba, Argentina y LATAM.",
        "url": "https://eccomfyarg.com",
        "logo": "https://eccomfyarg.com/images/logo-ecomfy.png",
        "image": "https://eccomfyarg.com/images/ecomfy-agencia-cordoba.jpg",
        "telephone": "[NÚMERO]",
        "email": "[EMAIL]",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Córdoba",
            "addressRegion": "Córdoba",
            "addressCountry": "AR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -31.4135,
            "longitude": -64.1811
        },
        "openingHours": "Mo-Fr 09:00-18:00",
        "areaServed": ["Córdoba", "Argentina", "Latinoamérica"],
        "serviceType": ["Marketing Digital", "Meta Ads", "Google Ads", "SEO", "Desarrollo Web", "Community Management", "Automatizaciones", "Branding", "Marcas Personales"],
        "founder": [
            { "@type": "Person", "name": "Juan", "jobTitle": "CEO y Cofundador" },
            { "@type": "Person", "name": "Fran", "jobTitle": "Cofundador" }
        ],
        "sameAs": ["https://instagram.com/eccomfy", "https://tiktok.com/@eccomfyarg"]
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Qué es un ecosistema digital?",
                "acceptedAnswer": { "@type": "Answer", "text": "Un ecosistema digital es la integración estratégica de todos los elementos de marketing online de un negocio: tráfico (SEO, ads, redes), conversión (web, landing pages, copywriting), retención (email, automatizaciones) y análisis de métricas. En Ecomfy construimos ecosistemas completos para marcas en Córdoba y LATAM." }
            },
            {
                "@type": "Question",
                "name": "¿Cuánto cuesta contratar una agencia de marketing en Córdoba?",
                "acceptedAnswer": { "@type": "Answer", "text": "En Ecomfy nuestros planes arrancan en USD $500/mes (Plan Base), USD $800/mes (Plan Growth) y USD $1.200/mes (Plan Pro). Cada plan incluye estrategia, contenido, web y reportes de métricas reales." }
            },
            {
                "@type": "Question",
                "name": "¿Trabajan con clientes fuera de Córdoba?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí. Aunque estamos basados en Córdoba, Argentina, trabajamos con marcas y negocios en todo LATAM de forma 100% remota." }
            }
        ]
    }
];

export const HomePage = () => {
    return (
        <div className="app-container" style={{ background: '#080808' }}>
            <SEOHead
                title="Ecomfy | Agencia de Marketing Digital en Córdoba | Growth Agency"
                description="Construimos ecosistemas digitales para marcas personales, infoproductores y negocios en Córdoba y LATAM. Tráfico + Conversión + Optimización = Crecimiento real. Consultá gratis."
                canonical="https://eccomfyarg.com/"
                schema={homeSchema}
            />
            <Navbar />

            <StackingWrapper zIndex={1}>
                <Hero />
            </StackingWrapper>

            <div style={{ position: 'relative', zIndex: 2 }}>
                <ScrollRevealText />
            </div>

            {/* Botón de consultoría gratuita — debajo del video/ecosistema */}
            <div style={{ position: 'relative', zIndex: 3, background: '#f2f0ea', width: '100%', overflow: 'hidden' }}>
                <CalendlyButton />
            </div>

            <div style={{ position: 'relative', zIndex: 3, background: '#080808' }}>
                <Features />
            </div>


            <div style={{ position: 'relative', zIndex: 4, background: 'transparent' }}>
                <Projects />
            </div>

            <div style={{ position: 'relative', zIndex: 6, background: '#08111d' }}>
                <Footer />
            </div>
        </div>
    );
};
