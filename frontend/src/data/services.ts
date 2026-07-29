import serviceCommunity from '../assets/community mananger.jpg';
import serviceFilmmaker from '../assets/filsmaker.jpg';
import serviceMarketing from '../assets/estrategia de marketing.jpg';
import serviceMetaads from '../assets/meta.jpg';
import serviceWeb from '../assets/desarollo web.jpg';
import serviceSoftware from '../assets/service_software.png';

export interface ServiceData {
    id: string;
    num: string;
    title: string;
    items: readonly string[];
    desc: string;
    image: string;
    fullDescription: string;
    impact: string;
    process: readonly string[];
    insight: string;
}

export const SERVICES_DATA: ServiceData[] = [
    {
        id: 'community',
        num: '01',
        title: 'Community Manager',
        items: [
            'Gestión y crecimiento de redes sociales',
            'Creación de calendarios editoriales mensuales',
            'Diseño de contenido visual y copy estratégico',
            'Moderación de mensajes y comentarios',
            'Reportes mensuales de métricas y crecimiento',
        ],
        desc: 'Gestionamos tus redes sociales de forma profesional para construir una comunidad sólida, aumentar el alcance orgánico y convertir seguidores en clientes. Estrategia, consistencia y resultados medibles.',
        image: serviceCommunity,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'filmmaker',
        num: '02',
        title: 'Fotografía y Video (Filmmaker)',
        items: [
            'Sesiones fotográficas profesionales para productos y marca',
            'Producción de videos publicitarios y reels',
            'Edición cinematográfica de alto nivel',
            'Contenido optimizado para redes sociales',
            'Cobertura de eventos corporativos',
        ],
        desc: 'Producimos contenido audiovisual de alto impacto: fotografías profesionales, videos publicitarios y reels que elevan la imagen de tu marca y generan engagement real en todas las plataformas.',
        image: serviceFilmmaker,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'marketing',
        num: '03',
        title: 'Estrategia de Marketing',
        items: [
            'Análisis de mercado y competencia',
            'Definición de buyer persona y posicionamiento de marca',
            'Planificación estratégica de contenidos',
            'Estrategias de crecimiento orgánico',
            'Funnel de ventas y customer journey',
        ],
        desc: 'Diseñamos estrategias de marketing integrales que conectan tu marca con el público correcto. Analizamos el mercado, definimos tu posicionamiento y trazamos el camino para alcanzar tus objetivos de negocio.',
        image: serviceMarketing,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'meta-ads',
        num: '04',
        title: 'Campañas en Meta Ads',
        items: [
            'Creación y gestión de campañas en Facebook e Instagram',
            'Segmentación avanzada de audiencias',
            'Diseño de creatividades para anuncios',
            'Optimización continua de presupuesto y rendimiento',
            'Reportes detallados de ROI y métricas clave',
        ],
        desc: 'Creamos y optimizamos campañas publicitarias en Facebook e Instagram para maximizar tu inversión. Segmentamos audiencias precisas, diseñamos creatividades de alto impacto y gestionamos cada peso para obtener el mejor retorno.',
        image: serviceMetaads,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'web',
        num: '05',
        title: 'Desarrollo Web',
        items: [
            'Landing pages de alta conversión',
            'Sitios corporativos profesionales',
            'Tiendas online (e-commerce)',
            'Diseño UX/UI moderno y responsivo',
            'Optimización SEO técnico',
        ],
        desc: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para generar confianza, atraer clientes y potenciar tu presencia digital. Cada proyecto está pensado para convertir visitas en resultados.',
        image: serviceWeb,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'software',
        num: '06',
        title: 'Desarrollo de Software',
        items: [
            'Sistemas de gestión a medida (ERP/CRM)',
            'Aplicaciones web y móviles escalables',
            'Automatizaciones e integraciones con IA',
            'Dashboards y paneles de control',
            'Código limpio, seguro y mantenible',
        ],
        desc: 'Creamos sistemas y aplicaciones personalizadas adaptadas a los procesos de tu empresa para mejorar la productividad, centralizar información y optimizar operaciones. Tecnología sólida para negocios que crecen.',
        image: serviceSoftware,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
];
