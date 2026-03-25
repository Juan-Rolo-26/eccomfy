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
        id: 'ia',
        num: '01',
        title: 'IA y Automatizaciones',
        items: [
            'Asistentes virtuales con IA disponibles 24/7 (WhatsApp, Web, IG)',
            'Seguimiento automático de leads (Nutrición omnicanal)',
            'Recuperación inteligente de carritos abandonados',
            'Integración profunda entre CRM, E-commerce y Meta',
            'Flujos de agendamiento de citas automáticos',
            'Automatización de procesos operativos internos y facturación',
            'Clasificación y lead scoring mediante Inteligencia Artificial',
        ],
        desc: 'Implementamos sistemas automatizados que permiten que tu negocio funcione de manera más eficiente, reduciendo tareas manuales.',
        image: serviceIa,
        fullDescription:
            'Tu negocio no puede depender del ancho de banda humano para tareas repetitivas. Construimos e implementamos sistemas inteligentes que conectan tus herramientas clave mediante IA y automatizaciones avanzadas. Esto transforma procesos lentos y propensos a errores en ecosistemas ágiles que responden al cliente en segundos, interactúan de manera humana, y cierran ventas o programan citas a cualquier hora del día. Así, tu equipo se libera para enfocarse estrictamente en la toma de decisiones, la estrategia de alto nivel y el trato personalizado.',
        impact:
            'La automatización rompe el techo de cristal de tu crecimiento operativo. Elimina los cuellos de botella y te permite procesar 10x o 100x más interacciones sin aumentar tu nómina. Esto significa escalabilidad pura, un servicio al cliente impecable y un margen de rentabilidad agresivamente superior.',
        process: [
            'Auditoría de procesos actuales y detección de tiempos muertos',
            'Diseño de arquitectura de automatización y flujos lógicos',
            'Integración técnica (n8n, Make, Zapier, APIs) e implementación de IA',
            'Fase de pruebas en entorno cerrado y debugs de edge cases',
            'Lanzamiento, monitoreo y optimización iterativa de respuestas',
        ],
        insight:
            'Un negocio que depende de la memoria o el click manual de un humano está destinado a estancarse. Un negocio automatizado escala sin fricciones ni fatiga.',
    },
    {
        id: 'web',
        num: '02',
        title: 'Desarrollo Web',
        items: [
            'Diseño UX/UI de alta conversión y neuropsychology',
            'Desarrollo de performance extrema con React, Next.js y Vite',
            'Arquitectura Mobile-First y Responsive Design sin fallas',
            'Integración con pasarelas de pago, CRMs y analítica avanzada',
            'Optimización de Core Web Vitals y tiempos de carga relámpago',
            'Landing Pages modulares diseñadas exclusivamente según el funnnel',
            'Sistemas de gestión de contenidos (CMS) escalables y sin fricción',
        ],
        desc: 'Creamos sitios web y tiendas online diseñados para convertir visitantes en clientes, no solo para verse bien.',
        image: serviceWeb,
        fullDescription:
            'Tener "solo una página web" es el mayor error de la era digital. Tu sitio web debe actuar como tu mejor vendedor, trabajando 24 horas al día, 7 días a la semana, guiando al usuario por un camino psicológico perfectamente diseñado hasta la acción deseada (compra, registro o agendamiento). Combinamos un diseño de primer nivel que proyecta máxima autoridad con ingeniería técnica de punta bajo el capó. Cada píxel, cada animación y cada bloque de texto está posicionado estratégicamente para reducir la fricción cognitiva y maximizar el porcentaje de conversión de tu tráfico.',
        impact:
            'Tu web es el activo central de tu ecosistema. Si no convierte, todo el dinero que inviertas en publicidad o redes sociales se escurre por un colador. Una web optimizada literalmente multiplica el retorno de toda tu inversión en marketing.',
        process: [
            'Consultoría técnica, análisis de la oferta y objetivos comerciales',
            'Wireframing y prototipado enfocado en el recorrido del usuario (UX)',
            'Diseño visual de interfaz (UI) premium alineado con la identidad',
            'Desarrollo estructural limpio, validado y optimizado en velocidad',
            'Testeo exhaustivo, lanzamiento en producción y mantenimiento',
        ],
        insight:
            'No necesitás obsesionarte con conseguir más tráfico. Necesitás urgentemente una web que convierta exponencialmente el tráfico que ya tenés.',
    },
    {
        id: 'seo',
        num: '03',
        title: 'SEO & SEM',
        items: [
            'Auditoría y arquitectura SEO técnica de alto nivel',
            'Investigación de clusters de palabras clave de alta intención',
            'Creación y estructuración de contenido indexable',
            'Estrategia y ejecución de campañas SEM en Google Ads (Search, PMax)',
            'Optimización iterativa de ROAS y CPA (Costo Por Adquisición)',
            'Configuración avanzada de seguimiento de conversiones (Tag Manager)',
            'Análisis granular de rendimiento y reportes de rentabilidad',
        ],
        desc: 'Posicionamos tu negocio en buscadores para captar tráfico con intención real de compra, orgánica o pagada.',
        image: serviceSeo,
        fullDescription:
            'Hay prospectos que ahora mismo tienen la tarjeta de crédito en la mano, buscando en Google exactamente la solución que vos ofrecés. Si no aparecés en los primeros resultados, ese dinero se lo lleva tu competencia, así de simple. Mediante una sinergia perfecta entre posicionamiento orgánico estructurado (SEO) a largo plazo y captación de demanda acelerada a nivel pago (SEM - Google Ads), interceptamos a tus clientes potenciales en el instante más caliente y de mayor dolor de su proceso de compra para redirigirlos a tu embudo.',
        impact:
            'A diferencia de las redes sociales impulsadas por interrupción, acá captamos intencionalidad absoluta. Atraer personas que están activamente buscando comprar aumenta radicalmente la calidad del lead, baja el tiempo de cierre y escala tus ingresos con un retorno gigantesco.',
        process: [
            'Minería de datos de demanda real e investigación de keywords transaccionales',
            'Corrección de errores estructurales web para indexación (SEO Técnico)',
            'Auditoría y optimización de Landing Pages para campañas de pago',
            'Lanzamiento, ajuste y escalado progresivo de campañas en Google Ads',
            'Monitorización algorítmica y mejora continua de posiciones',
        ],
        insight:
            'Ser el primero en Google no es una "métrica de vanidad", es el acto de monopolizar activamente la demanda capturada en su punto de mayor necesidad.',
    },
    {
        id: 'branding',
        num: '04',
        title: 'Branding',
        items: [
            'Definición profunda de posicionamiento de mercado',
            'Diseño corporativo e identidad visual magnética',
            'Estandarización de tono, voz y arquetipos de comunicación',
            'Creación de ángulos únicos y propuesta narrativa de valor',
            'Elaboración de manuales y directrices de marca (Brand Guidelines)',
            'Estrategias de diferenciación y percepción de autoridad',
            'Rebranding y adaptación digital de marcas maduras',
        ],
        desc: 'Construimos marcas con una identidad clara y diferenciada que conectan emocionalmente con el cliente.',
        image: serviceBranding,
        fullDescription:
            'No podés ser percibido como premium si te ves genérico. Una marca no es simplemente un logo bonito o unos colores llamativos; es la emoción visceral y la imagen de autoridad que viene a la cabeza de tus consumidores cuando escuchan tu nombre. Nosotros trabajamos los cimientos estratégicos y visuales de tu negocio para transformar un simple producto o servicio en una opción indudable dentro del mercado. Elevamos la estética y estandarizamos cada elemento para formar marcas sólidas que generen conexión con tu mercado meta.',
        impact:
            'Una marca sólidamente construida no solo mejora la superficie estética; literalmente te saca de la competencia por precio. Cuanto más valor, calidad y confianza transmita tu identidad visual, más dejas de ser una opción más y te volvés un deseo, impactando tus márgenes de ganancia directamente.',
        process: [
            'Análisis sociológico del mercado, buyer persona y benchmarkings',
            'Definición estratégica del pilar emocional de la marca',
            'Desarrollo iterativo de identidad visual (logotipo, paletas, grafismos)',
            'Definición de lineamientos comunicacionales y sistemas de diseño',
            'Aplicación sistemática y despliegue a lo largo del ecosistema digital',
        ],
        insight:
            'Si tu valor diferencial es el precio, no tenés un modelo de negocio, tenés una commodity. El Branding es el vehículo para blindar y aumentar tus precios.',
    },
    {
        id: 'metaads',
        num: '05',
        title: 'Meta Ads',
        items: [
            'Compra de medios avanzada en Facebook e Instagram Ads',
            'Estructuración algorítmica y segmentación de datos',
            'Generación de creatividades publicitarias persuasivas',
            'Testeo iterativo de A/B estructural y ángulos de venta',
            'Sistemas agresivos y dinámicos de retargeting omnicanal',
            'Arquitectura de embudos pagos, de CBO a ventajas Advantage+',
            'Análisis exhaustivo del embudo para minimizar CPA e impulsar ROAS',
        ],
        desc: 'Gestionamos campañas en Facebook e Instagram enfocadas puramente en retorno (ROI), no en me gustas.',
        image: serviceMetaads,
        fullDescription:
            'El tráfico pago es la sangre de un sistema predecible, pero quemar dinero en Facebook solo presionando "Promocionar" es la forma más rápida de quebrar. Ejecutamos campañas publicitarias altamente quirúrgicas que empujan la psicología de compra de tu usuario ideal. Combinamos creatividad estructurada que interrumpe el scroll de forma efectiva, copywriting que vende, y estructuras de testeo paramétricas en el Ads Manager que le dictan al algoritmo de Meta Ads cómo ir por tu cliente más rentable posible. El foco siempre es escalabilidad y rentabilidad palpable.',
        impact:
            'Logramos comprar dinero futuro a descuento invirtiendo capital presente. Un sistema maduro en Meta Ads te da previsibilidad, permitiendo inyectar $1.000 y saber con exactitud cuánto vas a sacar del otro lado, dándote control financiero sobre tu propio crecimiento.',
        process: [
            'Alineación con la oferta e instalación profunda de Meta Pixel y API de conversiones',
            'Desarrollo estructural de creatividades y copys para múltiples ángulos',
            'Fase de Testing algorítmico y minería de audiencias ganadoras',
            'Depuración de ineficiencias y validación estricta de costos por evento',
            'Fase de escalado agresivo vertical y horizontal de presupuestos',
        ],
        insight:
            'La diferencia abismal entre un negocio promedio y una empresa exitosa no reside en gastar más anunciando, sino en saber escalar invirtiendo mejor que su competidor.',
    },
    {
        id: 'estrategia',
        num: '06',
        title: 'Estrategia de Marketing',
        items: [
            'Elaboración del Customer Journey absoluto y arquitecturas de negocio',
            'Mapeo estructurado para potenciar la Oferta Irresistible',
            'Modelado de arquitectura de Embudo de Ventas e infraestructura',
            'Selección macro-estratégica de ecosistemas y tracción en canales',
            'Planes operativos de adquisición, nutrición y retención',
            'Proyección financiera, unit economics y modelos de escalabilidad',
            'Definición de palancas sistémicas para mejorar LTV vs CAC',
        ],
        desc: 'Diseñamos la estructura integral de tu negocio que dictamina cómo atraes, vendes y retendrás clientes en un bucle continuo.',
        image: serviceStrategy,
        fullDescription:
            'Tener el mejor embudo, los mejores anuncios o los mejores creativos no sirve de nada si todos son islotes que no se hablan entre sí. La estrategia de marketing no es un grupo de tácticas sueltas de redes sociales; es la disciplina fundamental, el plano arquitectónico corporativo que dicta cómo va a sobrevivir el negocio. Nos metemos hasta el fondo de los cimientos de tu empresa para entender exactamente de qué depende que la gente confíe, cuánto les cuesta llegar a la puerta, y por qué se irían. Así rediseñamos, optimizamos y reestructuramos el negocio como una máquina holística enfocada en un único propósito: crecer.',
        impact:
            'Cuando hacés piezas dispersas es como tirar dardos en la oscuridad buscando generar impacto. Con una estrategia de primer nivel bajada a tierra, todas tus herramientas y operaciones orbitan un objetivo, produciendo sinergia multiplicativa. Lo táctico y lo operativo se potencian y tu facturación empieza a volverse agresivamente predecible.',
        process: [
            'Inmersión granular y diagnóstico clínico de tu estado y funnels actuales',
            'Diseño matemático de la Oferta y modelo del sistema de negocios',
            'Planificación de la infraestructura tecnológica, canales y equipos',
            'Rollout de embudos en múltiples fases asegurando control de variables',
            'Análisis macro de unit economics para habilitar escalamiento sin roturas',
        ],
        insight:
            'Estar extremadamente ocupado haciendo marketing no significa estar avanzando. No necesitás probar una red social nueva, necesitás que lo que ya hacés, tenga un sistema dirigido y coherente.',
    },
    {
        id: 'community',
        num: '07',
        title: 'Community Manager',
        items: [
            'Arquitectura editorial estratégica enfocada en educar, inspirar y vender',
            'Diseño conceptual de feeds de marca, carruseles y visuales ricas',
            'Redacción (Copywriting) psicológica orientada a capturar compromiso',
            'Gestión algorítmica de historias, formatos efímeros y picos de retención',
            'Operaciones de fidelización: Respuesta inmediata y control de mensajes',
            'Construcción progresiva de capital social, autoridad y tribus en línea',
            'Análisis constante de indicadores de salud, insights sociales y pivoteo',
        ],
        desc: 'Convertimos tus redes sociales estáticas en un motor activo de credibilidad mediante gestión profunda, visual y relacional.',
        image: serviceCommunity,
        fullDescription:
            'Las redes sociales superaron con creces el rol anticuado de "ser un catálogo" o "portafolio". Hoy en día, son la cara, la voz y el nivel de autoridad indiscutida que representa a un negocio. Las personas le compran a aquellos en quienes confían incuestionablemente, y la confianza se transmite mediante la consistencia, el carisma, y aportando valor educativo desmesurado de manera iterativa y genuina. Nuestra gestión se hace puramente bajo una tesis comercial, convirtiendo a meros seguidores o mirones apáticos en integrantes convencidos de la comunidad, listos para interactuar de por vida y volverse embajadores y clientes rentables.',
        impact:
            'La consistencia de marca sostenida mediante una exposición de calidad crea un "efecto halo" de legitimidad insuperable ante tu público. Esta capa enorme de autoridad ablanda fricciones, acelera dramáticamente embudos de venta y empuja positivamente absolutamente todo lo demás de la base del negocio.',
        process: [
            'Auditoría y deconstrucción de activos en redes sociales, competencia y oportunidades',
            'Trazado del pilar temático editorial orientando los ángulos orgánicos',
            'Setup mensual de parrillas, diseños, planillas de texto y programación',
            'Publicación viva, interacción comunitaria y respuestas programáticas',
            'Generación de reportes algorítmicos detallados para recalibración y mejora continua',
        ],
        insight:
            'Un negocio es débil si mendiga atención o persigue ciegamente la viralidad. La ganancia real proviene de edificar relaciones estables que generen suficiente credibilidad para que te reclamen como su primera opción de compra.',
    },
];
