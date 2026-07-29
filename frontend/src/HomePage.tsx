import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealText } from './components/ScrollRevealText';
import { Footer } from './components/Footer';
import { StackingWrapper } from './components/StackingWrapper';
import { CalendlyButton } from './components/CalendlyButton';
import { SEOHead } from './components/SEOHead';

/**
 * Schema markup para el Home.
 * SEO Intent: "agencia digital córdoba", "community manager córdoba", "meta ads argentina"
 */
const homeSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://eccomfyarg.com/#service-main',
        'name': 'Eccomfy — Agencia Digital Creativa',
        'description': 'Agencia digital en Córdoba, Argentina. Servicios de community manager, fotografía y video (filmmaker), estrategia de marketing, campañas en Meta Ads y desarrollo web para marcas y PyMEs.',
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
            'Community Manager',
            'Fotografía y Video Profesional',
            'Filmmaker y Producción Audiovisual',
            'Estrategia de Marketing Digital',
            'Campañas en Meta Ads (Facebook e Instagram)',
            'Desarrollo Web y Landing Pages',
            'Desarrollo de Software a Medida',
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
            'name': 'Servicios de Agencia Digital',
            'itemListElement': [
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Community Manager',
                        'description': 'Gestión profesional de redes sociales, creación de contenido y crecimiento de comunidades para marcas en Argentina.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Fotografía y Video (Filmmaker)',
                        'description': 'Producción audiovisual de alto impacto: fotos profesionales, videos publicitarios y reels para redes sociales.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Estrategia de Marketing Digital',
                        'description': 'Planificación estratégica de marketing integral, posicionamiento de marca y funnels de ventas para PyMEs argentinas.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Campañas en Meta Ads',
                        'description': 'Gestión y optimización de campañas publicitarias en Facebook e Instagram para maximizar el ROI.',
                    },
                },
                {
                    '@type': 'Offer',
                    'itemOffered': {
                        '@type': 'Service',
                        'name': 'Desarrollo Web y Landing Pages',
                        'description': 'Sitios web y landing pages de alta conversión con diseño moderno y optimización SEO.',
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
                    'text': 'Eccomfy es una agencia digital creativa ubicada en Córdoba, Argentina. Ofrecemos servicios de community manager, fotografía y video profesional (filmmaker), estrategia de marketing digital, campañas en Meta Ads y desarrollo web para marcas y PyMEs que quieren crecer en el ecosistema digital.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Qué incluye el servicio de community manager?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Nuestro servicio de community manager incluye gestión completa de redes sociales (Instagram, Facebook, TikTok), creación de calendarios editoriales, diseño de contenido visual y copy estratégico, moderación de mensajes y reportes mensuales de métricas y crecimiento.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Hacen producción de videos y fotografía profesional?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Sí, contamos con un equipo de filmmakers y fotógrafos profesionales. Realizamos sesiones fotográficas para productos y marca, producción de videos publicitarios, reels y edición cinematográfica de alto nivel. Todo el contenido queda optimizado para redes sociales y plataformas digitales.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Gestionan campañas de publicidad en Meta Ads?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Sí, creamos y gestionamos campañas en Facebook e Instagram Ads con segmentación avanzada de audiencias, diseño de creatividades de alto impacto y optimización continua del presupuesto. Brindamos reportes detallados de ROI y métricas clave para que siempre sepas cómo está funcionando tu inversión.',
                },
            },
            {
                '@type': 'Question',
                'name': '¿Trabajan con marcas de todo Argentina o solo de Córdoba?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Aunque estamos basados en Córdoba, trabajamos con marcas y empresas de todo Argentina de forma 100% remota. Atendemos clientes en Buenos Aires, Rosario, Mendoza y el resto del país.',
                },
            },
        ],
    },
];

export const HomePage = () => {
    return (
        /*
         * ─── SEO CONTENT NOTES ─────────────────────────────────────────────
         * H1 principal: "Agencia Digital Creativa" (en Hero.tsx)
         * H2 secondary: "Soluciones digitales que impulsan tu marca" (Features)
         * H2 secondary: "Socios estratégicos de tu negocio" (ScrollRevealText)
         * Keyword principal home: "agencia digital córdoba"
         * LSI keywords: community manager, filmmaker, meta ads argentina,
         *               estrategia marketing digital, fotografía profesional
         * ──────────────────────────────────────────────────────────────────── */
        <div className="app-container" style={{ background: 'var(--bg-color)', width: '100%', overflowX: 'hidden' }}>
            <SEOHead
                title="Eccomfy | Agencia Digital Creativa en Córdoba, Argentina"
                description="Agencia digital en Córdoba. Community manager, fotografía y video (filmmaker), estrategia de marketing y campañas en Meta Ads para marcas y PyMEs. Consultá gratis."
                canonical="https://eccomfyarg.com/"
                schema={homeSchema}
            />
            <Navbar />

            <StackingWrapper zIndex={1}>
                <Hero />
            </StackingWrapper>

            {/* Sección nosotros — H2: "Socios estratégicos de tu negocio" */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <ScrollRevealText />
            </div>

            {/* CTA principal — debajo de nosotros */}
            <div style={{ position: 'relative', zIndex: 3, width: '100%', overflow: 'hidden' }}>
                <CalendlyButton />
            </div>

            {/* Footer — NAP: nombre, dirección, teléfono */}
            <div style={{ position: 'relative', zIndex: 6, background: 'var(--bg-color)', marginTop: '60px' }}>
                <Footer />
            </div>
        </div>
    );
};
