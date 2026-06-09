import serviceIa from '../assets/service_ia.png';
import serviceWeb from '../assets/service_web.png';
import serviceSeo from '../assets/service_seo.png';
import serviceBranding from '../assets/service_branding.png';
import serviceMetaads from '../assets/service_metaads.png';
import serviceStrategy from '../assets/service_strategy.png';
import serviceCommunity from '../assets/service_community.png';

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
        id: 'software',
        num: '01',
        title: 'Desarrollo de Software a Medida',
        items: [
            'Sistemas de gestión internos y ERP/CRM personalizados.',
            'Arquitectura en la nube y microsservicios altamente escalables.',
            'Modernización de plataformas legacy.',
        ],
        desc: 'Construimos sistemas robustos que automatizan y eficientizan la operación de tu negocio.',
        image: serviceWeb,
        fullDescription:
            'Creamos soluciones tecnológicas específicamente diseñadas para los desafíos únicos de tu industria. No usamos plantillas ni sistemas genéricos; desarrollamos software desde cero que se adapta a tus flujos de trabajo.',
        impact:
            'Reduce costos operativos, elimina errores humanos y proporciona una base tecnológica escalable para el crecimiento a largo plazo.',
        process: [
            'Análisis de requerimientos y toma de decisiones arquitectónicas',
            'Diseño de base de datos y flujos de información',
            'Desarrollo ágil en sprints',
            'Pruebas automatizadas y de estrés',
            'Despliegue e integración continua'
        ],
        insight:
            'Tu software debe adaptarse a tu negocio, no tu negocio al software.',
    },
    {
        id: 'mobile',
        num: '02',
        title: 'Desarrollo de Apps Móviles',
        items: [
            'Aplicaciones nativas e híbridas para iOS y Android.',
            'Interfaces (UI/UX) intuitivas y centradas en el usuario final.',
            'Integraciones con APIs de terceros y hardware de dispositivos.',
        ],
        desc: 'Llevamos tu negocio al bolsillo de cada uno de tus clientes.',
        image: serviceStrategy,
        fullDescription:
            'Diseñamos y desarrollamos aplicaciones móviles con altísimo rendimiento, asegurando una experiencia de usuario perfecta. Usamos las mejores tecnologías del mercado para entregar productos de calidad mundial.',
        impact:
            'Fideliza clientes, mejora la accesibilidad de tu servicio y crea nuevos canales de monetización directa.',
        process: [
            'Conceptualización y wireframing',
            'Diseño de interfaz de usuario de alta fidelidad',
            'Desarrollo frontend y backend concurrente',
            'Beta testing e integraciones',
            'Publicación en App Store y Google Play'
        ],
        insight:
            'Una gran aplicación no es solo código, es una extensión valiosa de tu ecosistema comercial.',
    },
    {
        id: 'cloud',
        num: '03',
        title: 'Cloud & DevOps',
        items: [
            'Migración a infraestructuras en la nube (AWS, Google Cloud, Azure).',
            'Implementación de pipelines de CI/CD.',
            'Monitoreo, seguridad y optimización de recursos continuos.',
        ],
        desc: 'Infraestructuras escalables, seguras y preparadas para alto tráfico.',
        image: serviceSeo,
        fullDescription:
            'Nos aseguramos de que tus aplicaciones nunca se caigan. Implementamos infraestructuras como código que permiten un escalado automático para acompañar el crecimiento orgánico o viral de tu plataforma.',
        impact:
            'Elimina los tiempos de inactividad, aumenta la resiliencia operativa y reduce drásticamente los costos de servidores.',
        process: [
            'Auditoría y diseño de la arquitectura cloud',
            'Containerización e implementación de Kubernetes',
            'Configuración de integraciones de CI/CD',
            'Políticas de seguridad y respaldos',
            'Monitoreo 24/7 y alertas tempranas'
        ],
        insight:
            'Una infraestructura impecable es invisible para el usuario, pero indispensable para la supervivencia.',
    },
    {
        id: 'ia',
        num: '04',
        title: 'Inteligencia Artificial y ML',
        items: [
            'Modelos de predicción y análisis de grandes volúmenes de datos.',
            'Asistentes virtuales y agentes de IA generativa.',
            'Automatización de toma de decisiones operativas.',
        ],
        desc: 'Integramos algoritmos de vanguardia para potenciar tu oferta.',
        image: serviceIa,
        fullDescription:
            'Utilizamos la inteligencia artificial para crear ventajas competitivas injustas. Desde modelos LLMs personalizados hasta algoritmos de machine learning profundo que analizan tu cartera de clientes y sugieren acciones.',
        impact:
            'Multiplica la eficiencia operativa y descubre nuevas vías de rentabilidad basadas puramente en datos y predicciones.',
        process: [
            'Extracción y limpieza de datos',
            'Entrenamiento y fine-tuning de modelos',
            'Integración de IA a través de APIs internas',
            'Pruebas y mejora iterativa de exactitud',
            'Implementación en el negocio y capacitación'
        ],
        insight:
            'La IA no reemplaza negocios, reemplaza a aquellos que se niegan a adoptarla.',
    },
    {
        id: 'web',
        num: '05',
        title: 'Desarrollo Web',
        items: [
            'Landing Pages de alta conversión',
            'Sitios corporativos premium',
            'E-commerce y B2B platforms',
        ],
        desc: 'Construimos páginas ultrarrápidas y escalables enfocadas en velocidad y autoridad.',
        image: serviceWeb,
        fullDescription:
            'Tu página web es la infraestructura digital principal de la compañía. Desarrollamos plataformas interactivas utilizando stack moderno (React, Next.js) asegurando métricas excepcionales de performance y SEO técnico avanzado.',
        impact:
            'Reduce las tasas de rebote al mínimo, mejora el tiempo de sesión y dispara la conversión general del tráfico hacia ventas.',
        process: [
            'Arquitectura de la información',
            'Desarrollo Frontend Interactivo',
            'Integración con APIs e infraestructuras',
            'Performance Core Web Vitals',
            'QA y Despliegue en producción'
        ],
        insight:
            'Una arquitectura web brillante hace que toda tu estrategia sea rentable.',
    },
    {
        id: 'uxui',
        num: '06',
        title: 'Diseño UX / UI',
        items: [
            'Sistemas de Diseño',
            'Prototipado Interactivo',
            'Исследование y User Flows',
        ],
        desc: 'Interfaces estéticas e intuitivas que conectan emocionalmente y elevan tu tecnología.',
        image: serviceBranding,
        fullDescription:
            'El diseño no es empacado. Aplicamos procesos profundos de UX para entender la psicología y fricción de los operadores. Elaboramos interfaces de última generación creando experiencias inmersivas y altamente deseables.',
        impact:
            'Extrema retención de usuarios, onboarding fluido y un posicionamiento inmediato como líder innovador del mercado.',
        process: [
            'User Flows y Arquitectura',
            'Wireframing y bocetado estructural',
            'Figma UI Kit corporativo',
            'Prototipado interactivo avanzado',
            'Hand-off al equipo Engineering'
        ],
        insight:
            'El gran diseño desaparece mientras se usa; solo deja impacto.',
    }
];
