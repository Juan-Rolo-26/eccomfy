import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealText } from './components/ScrollRevealText';
import { Footer } from './components/Footer';
import { StackingWrapper } from './components/StackingWrapper';
import { CalendlyButton } from './components/CalendlyButton';
import { SEOHead } from './components/SEOHead';

/**
 * Schema markup para el Home.
 * SEO Intent: "agencia de software córdoba", "desarrollo de software para pymes argentina"
 * E-E-A-T: Experience → proyectos reales. Expertise → servicios específicos.
 * Authoritativeness → reseñas reales pendientes. Trust → NAP completo + legal.
 */
const homeSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://eccomfyarg.com/#service-main',
        'name': 'Eccomfy — Agencia de Software para PyMEs',
        'description': 'Desarrollamos software a medida, aplicaciones móviles, automatizaciones con IA y landing pages profesionales para PyMEs en Córdoba y Argentina. Tecnología escalable, sin burocracia.',
        'url': 'https://eccomfyarg.com',
        'logo': 'https://eccomfyarg.com/favicon-eccomfy.png',
        'image': 'https://eccomfyarg.com/og-eccomfy.jpg',
        'telephone': '+54-351-371-2759',
        'email': 'eccomfyarg@gmail.com',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Córdoba',
            'addressRegion': 'Córdoba',
            'postalCode': '5000',
            'addressCountry': 'AR',
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': -31.4135,
            'longitude': -64.1811,
        },
        'openingHoursSpecification': [
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens': '09:00',
                'closes': '18:00',
            },
        ],
        'priceRange': '$$',
        'currenciesAccepted': 'ARS, USD',
        'areaServed': ['Córdoba', 'Buenos Aires', 'Rosario', 'Argentina', 'Latinoamérica'],
        'serviceType': [
            'Desarrollo de Software a Medida',
            'Aplicaciones Móviles iOS Android',
            'Cloud y DevOps',
            'Inteligencia Artificial y Machine Learning',
            'Desarrollo Web y Landing Pages',
            'Diseño UX UI',
        ],
        'founder': [
            { '@type': 'Person', 'name': 'Juan', 'jobTitle': 'CEO y Cofundador' },
            { '@type': 'Person', 'name': 'Fran', 'jobTitle': 'Cofundador' },
        ],
        'sameAs': [
            'https://www.instagram.com/eccomfyarg',
            'https://www.tiktok.com/@eccomfy',
        ],
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Servicios de Software para PyMEs',
            'itemListElement': [
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Desarrollo de Software a Medida',
                        'description': 'Sistemas de gestión, ERP/CRM personalizados y plataformas escalables para PyMEs argentinas.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Aplicaciones Móviles',
                        'description': 'Apps nativas e híbridas para iOS y Android con alto rendimiento y UX centrada en el usuario.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Automatizaciones con Inteligencia Artificial',
                        'description': 'Agentes de IA, modelos de predicción y automatización de procesos para PyMEs en Argentina.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Landing Pages Profesionales',
                        'description': 'Landing pages de alta conversión y sitios corporativos premium con React y Next.js.',
                    },
                },
            ],
        },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': '¿Qué es Eccomfy?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Eccomfy es una agencia de software para PyMEs ubicada en Córdoba, Argentina. Desarrollamos sistemas a medida, aplicaciones móviles, automatizaciones con IA y landing pages profesionales para pequeñas y medianas empresas que buscan crecer con tecnología real y accesible.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Cuánto cuesta desarrollar software a medida en Argentina?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'En Eccomfy cada proyecto es único. El costo depende del alcance, complejidad y tecnologías requeridas. Ofrecemos una consultoría inicial gratuita de 30 minutos para evaluar tu necesidad y dar un presupuesto sin compromiso. Trabajamos en pesos argentinos y dólares según el proyecto.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Trabajan con PyMEs de todo Argentina o solo de Córdoba?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Aunque estamos basados en Córdoba, Argentina, trabajamos con PyMEs de todo el país de forma 100% remota. Atendemos clientes en Buenos Aires, Rosario, Mendoza y el resto de Latinoamérica.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Cuánto tiempo demora desarrollar un sistema de gestión a medida?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'El tiempo depende del alcance. Una landing page puede estar lista en 1-2 semanas. Un sistema de gestión básico requiere entre 4 y 8 semanas. Plataformas más complejas pueden llevar de 3 a 6 meses. Trabajamos en sprints ágiles para entregar valor desde el primer sprint.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Qué diferencia a Eccomfy de otras agencias de software en Córdoba?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Eccomfy está especializada en PyMEs argentinas. Entendemos los desafíos locales: presupuestos ajustados, necesidad de soluciones rápidas y escalables. No usamos plantillas genéricas; cada proyecto se desarrolla desde cero para los flujos únicos de tu negocio. Sin burocracia, con resultados medibles.',
                },
            },
        ],
    },
];

export const HomePage = () => {
    return (
        /*
         * ─── SEO CONTENT NOTES ─────────────────────────────────────────────
         * H1 principal: "Agencia de Software" (en Hero.tsx)
         * H2 secondary: "Soluciones digitales que impulsan tu negocio" (Features)
         * H2 secondary: "Arquitectos de tu infraestructura digital" (ScrollRevealText)
         * H2 secondary: "Historias que construimos junto a cada marca" (Projects)
         * Keyword principal home: "agencia de software para pymes córdoba"
         * LSI keywords: desarrollo software Argentina, sistemas gestión pymes,
         *               automatizaciones IA, landing pages córdoba, apps móviles
         * ──────────────────────────────────────────────────────────────────── */
        <div className="app-container" style={{ background: '#080808', width: '100%', overflowX: 'hidden' }}>
            <SEOHead
                title="Eccomfy | Agencia de Software para PyMEs en Córdoba, Argentina"
                description="Desarrollamos software a medida, apps móviles, sistemas con IA y landing pages para PyMEs en Córdoba y Argentina. Tecnología escalable, sin burocracia. Consultá gratis."
                canonical="https://eccomfyarg.com/"
                schema={homeSchema}
            />
            <Navbar />

            <StackingWrapper zIndex={1}>
                <Hero />
            </StackingWrapper>

            {/* Sección nosotros — H2: "Arquitectos de tu infraestructura digital" */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <ScrollRevealText />
            </div>

            {/* CTA principal — debajo de nosotros */}
            <div style={{ position: 'relative', zIndex: 3, background: '#f2f0ea', width: '100%', overflow: 'hidden' }}>
                <CalendlyButton />
            </div>

            {/* Footer — NAP: nombre, dirección, teléfono */}
            <div style={{ position: 'relative', zIndex: 6, background: '#08111d', marginTop: '60px' }}>
                <Footer />
            </div>
        </div>
    );
};
