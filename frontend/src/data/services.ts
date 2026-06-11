import serviceIa from '../assets/service_ia.png';
import serviceWeb from '../assets/service_web.png';
import serviceSeo from '../assets/service_seo.png';
import serviceBranding from '../assets/service_branding.png';
import serviceStrategy from '../assets/service_strategy.png';

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
        id: 'web',
        num: '01',
        title: 'Desarrollo Web',
        items: [],
        desc: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para generar confianza, atraer clientes y potenciar tu presencia digital.',
        image: serviceWeb,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'software',
        num: '02',
        title: 'Desarrollo de Software',
        items: [],
        desc: 'Creamos sistemas personalizados adaptados a los procesos de tu empresa para mejorar la productividad, centralizar información y optimizar operaciones.',
        image: serviceWeb,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'apps',
        num: '03',
        title: 'Aplicaciones Web',
        items: [],
        desc: 'Desarrollamos plataformas web escalables y accesibles desde cualquier dispositivo, preparadas para acompañar el crecimiento de tu negocio.',
        image: serviceStrategy,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'ia',
        num: '04',
        title: 'Inteligencia Artificial',
        items: [],
        desc: 'Implementamos soluciones impulsadas por IA para automatizar tareas, analizar información, optimizar procesos y mejorar la experiencia de tus clientes.',
        image: serviceIa,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'automations',
        num: '05',
        title: 'Automatizaciones',
        items: [],
        desc: 'Conectamos herramientas, eliminamos tareas repetitivas y diseñamos flujos automáticos que permiten ahorrar tiempo y aumentar la eficiencia operativa.',
        image: serviceSeo,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'hosting',
        num: '06',
        title: 'Hosting Empresarial',
        items: [],
        desc: 'Gestionamos la infraestructura necesaria para que tus proyectos estén siempre disponibles, rápidos y seguros.\n\nNos encargamos de la configuración, monitoreo, mantenimiento y optimización del hosting para que puedas enfocarte en tu negocio.',
        image: serviceBranding,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'domains',
        num: '07',
        title: 'Dominios',
        items: [],
        desc: 'Registramos y administramos dominios profesionales para fortalecer la identidad digital de tu empresa.\n\nAdemás configuramos correos corporativos personalizados para mejorar la comunicación y transmitir una imagen profesional.',
        image: serviceBranding,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    },
    {
        id: 'consulting',
        num: '08',
        title: 'Consultoría Tecnológica',
        items: [],
        desc: 'Analizamos tu situación actual y te ayudamos a definir la mejor estrategia tecnológica para alcanzar tus objetivos de negocio.',
        image: serviceStrategy,
        fullDescription: '',
        impact: '',
        process: [],
        insight: '',
    }
];
