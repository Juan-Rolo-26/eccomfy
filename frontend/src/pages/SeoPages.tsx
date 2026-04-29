import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

const faqSchema = {
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
};

const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

const getArticleSchema = (headline: string, path: string) => ([
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": headline,
        "author": { "@type": "Organization", "name": "Ecomfy" },
        "publisher": {
            "@type": "Organization",
            "name": "Ecomfy",
            "logo": { "@type": "ImageObject", "url": "https://eccomfyarg.com/images/logo-ecomfy.png" }
        },
        "datePublished": "2026-04-08",
        "dateModified": "2026-04-29",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://eccomfyarg.com${path}`
        }
    },
    getBreadcrumbSchema([
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: headline, url: `https://eccomfyarg.com${path}` }
    ])
]);

const SeoPageTemplate = ({
    title, description, canonical, schema, h1, path, breadcrumbs, isArticle
}: {
    title: string, description: string, canonical: string, schema?: object | object[], h1: string, path: string,
    breadcrumbs?: { name: string; url: string }[],
    isArticle?: boolean
}) => {
    const allSchema = schema
        ? Array.isArray(schema) ? schema : [schema]
        : [];

    if (breadcrumbs) {
        allSchema.push(getBreadcrumbSchema(breadcrumbs));
    }

    return (
        <div style={{ padding: '4rem 2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#fff', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
            <SEOHead
                title={title}
                description={description}
                canonical={canonical}
                schema={allSchema.length > 0 ? allSchema : undefined}
                articleMeta={isArticle ? {
                    publishedTime: "2026-04-08T00:00:00Z",
                    modifiedTime: "2026-04-29T00:00:00Z",
                    author: "Ecomfy",
                    section: "Marketing Digital"
                } : undefined}
            />
            {/* Breadcrumb navigation */}
            {breadcrumbs && (
                <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.85rem', opacity: 0.6 }}>
                    {breadcrumbs.map((crumb, i) => (
                        <span key={crumb.url}>
                            {i > 0 && ' › '}
                            {i < breadcrumbs.length - 1 ? (
                                <Link to={crumb.url.replace('https://eccomfyarg.com', '')} style={{ color: '#3eb290', textDecoration: 'none' }}>{crumb.name}</Link>
                            ) : (
                                <span>{crumb.name}</span>
                            )}
                        </span>
                    ))}
                </nav>
            )}
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#3eb290' }}>{h1}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>Contenido en construcción — {path}</p>
            <Link to="/" style={{ color: '#fff', textDecoration: 'underline', opacity: 0.6 }}>&larr; Volver al inicio</Link>
        </div>
    );
};

export const ServiciosIndex = () => <SeoPageTemplate
    title="Servicios de Marketing Digital | Ecomfy · Córdoba, Argentina"
    description="Meta Ads, SEO, Community Management, Desarrollo Web y Automatizaciones. Ecosistema digital completo para marcas en crecimiento. Planes desde USD $500/mes."
    canonical="https://eccomfyarg.com/servicios"
    schema={faqSchema}
    h1="Servicios de Marketing Digital en Córdoba — Ecosistema Completo"
    path="/servicios"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Servicios", url: "https://eccomfyarg.com/servicios" }
    ]}
/>;

export const MetaAdsPage = () => <SeoPageTemplate
    title="Gestión de Meta Ads en Córdoba | Facebook e Instagram Ads | Ecomfy"
    description="Campañas de Meta Ads gestionadas por expertos en Córdoba. Estrategia, segmentación, creatividades y optimización orientadas a conversión real. Sin promesas vacías."
    canonical="https://eccomfyarg.com/servicios/meta-ads"
    schema={faqSchema}
    h1="Gestión Profesional de Meta Ads en Córdoba"
    path="/servicios/meta-ads"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Servicios", url: "https://eccomfyarg.com/servicios" },
        { name: "Meta Ads", url: "https://eccomfyarg.com/servicios/meta-ads" }
    ]}
/>;

export const SeoServicePage = () => <SeoPageTemplate
    title="Posicionamiento Web en Google | SEO en Córdoba | Ecomfy"
    description="Posicionamos tu negocio en Google de forma orgánica. SEO técnico, on-page y contenido para negocios en Córdoba y Argentina que quieren ser encontrados."
    canonical="https://eccomfyarg.com/servicios/seo"
    schema={faqSchema}
    h1="Posicionamiento Web en Google — SEO para negocios en Córdoba"
    path="/servicios/seo"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Servicios", url: "https://eccomfyarg.com/servicios" },
        { name: "SEO", url: "https://eccomfyarg.com/servicios/seo" }
    ]}
/>;

export const DesarrolloWebPage = () => <SeoPageTemplate
    title="Landing Pages de Alta Conversión en Córdoba | Ecomfy"
    description="Diseñamos y desarrollamos landing pages, e-commerce y sitios web orientados a conversión. Cada página construida para vender, no solo para verse bien."
    canonical="https://eccomfyarg.com/servicios/desarrollo-web"
    schema={faqSchema}
    h1="Landing Pages de Alta Conversión en Córdoba"
    path="/servicios/desarrollo-web"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Servicios", url: "https://eccomfyarg.com/servicios" },
        { name: "Desarrollo Web", url: "https://eccomfyarg.com/servicios/desarrollo-web" }
    ]}
/>;

export const NosotrosPage = () => <SeoPageTemplate
    title="Quiénes Somos | Ecomfy · Growth Agency · Córdoba, Argentina"
    description="Juan y Fran, cofundadores de Ecomfy. Construimos ecosistemas digitales para marcas personales e infoproductores en Córdoba y toda Latinoamérica."
    canonical="https://eccomfyarg.com/nosotros"
    h1="Quiénes Somos — Ecomfy Growth Agency, Córdoba Argentina"
    path="/nosotros"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Nosotros", url: "https://eccomfyarg.com/nosotros" }
    ]}
/>;

export const BlogPage = () => <SeoPageTemplate
    title="Blog de Marketing Digital | Ecomfy · Estrategia y Ecosistemas"
    description="Artículos de marketing digital, Meta Ads, SEO y ecosistemas digitales para emprendedores, infoproductores y marcas en Argentina."
    canonical="https://eccomfyarg.com/blog"
    h1="Blog de Marketing Digital — Ecomfy"
    path="/blog"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" }
    ]}
/>;

export const ContactoPage = () => <SeoPageTemplate
    title="Contacto | Agendá tu Diagnóstico Gratuito | Ecomfy · Córdoba"
    description="Hablemos de tu negocio. Agendá una llamada de diagnóstico gratuita con el equipo de Ecomfy y descubrí cómo construir tu ecosistema digital."
    canonical="https://eccomfyarg.com/contacto"
    h1="Agendá tu Diagnóstico Gratuito — Ecomfy Córdoba"
    path="/contacto"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Contacto", url: "https://eccomfyarg.com/contacto" }
    ]}
/>;

export const CasosExitoPage = () => <SeoPageTemplate
    title="Casos de Éxito | Resultados Reales de Clientes | Ecomfy"
    description="Conocé los resultados reales que logramos con nuestros clientes. Métricas de negocio concretas: ROAS, CPL, leads generados y ventas."
    canonical="https://eccomfyarg.com/casos-de-exito"
    h1="Resultados Reales — Casos de Éxito de Ecomfy"
    path="/casos-de-exito"
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Casos de Éxito", url: "https://eccomfyarg.com/casos-de-exito" }
    ]}
/>;

// BLOG ARTICLES
export const BlogEcosistemaDigital = () => <SeoPageTemplate
    title="Qué es un Ecosistema Digital y por qué tu negocio lo necesita | Blog Ecomfy"
    description="En el marketing moderno, tener solo una página y posteos no alcanza. Descubrí qué es un ecosistema digital y cómo puede multiplicar la rentabilidad de tu negocio."
    canonical="https://eccomfyarg.com/blog/que-es-un-ecosistema-digital"
    schema={getArticleSchema("Qué es un Ecosistema Digital y por qué tu negocio lo necesita", "/blog/que-es-un-ecosistema-digital")}
    h1="Qué es un Ecosistema Digital y por qué tu negocio lo necesita"
    path="/blog/que-es-un-ecosistema-digital"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Ecosistema Digital", url: "https://eccomfyarg.com/blog/que-es-un-ecosistema-digital" }
    ]}
/>;

export const BlogInfoproductos = () => <SeoPageTemplate
    title="Cómo Vender Infoproductos Online en Argentina: Guía 2026 | Blog Ecomfy"
    description="Aprende los métodos definitivos para lanzar y vender infoproductos desde Argentina hacia toda la región cobrando en dólares o mediante plataformas locales."
    canonical="https://eccomfyarg.com/blog/como-vender-infoproductos-online-argentina"
    schema={getArticleSchema("Cómo Vender Infoproductos Online en Argentina: Guía 2026", "/blog/como-vender-infoproductos-online-argentina")}
    h1="Cómo Vender Infoproductos Online en Argentina: Guía Completa 2026"
    path="/blog/como-vender-infoproductos-online-argentina"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Infoproductos Argentina", url: "https://eccomfyarg.com/blog/como-vender-infoproductos-online-argentina" }
    ]}
/>;

export const BlogAgenciaCordoba = () => <SeoPageTemplate
    title="Agencia de Marketing Digital en Córdoba: Cómo elegirla | Blog Ecomfy"
    description="No tires más dinero en agencias que solo suben fotos. Descubrí los pilares y métricas que debes exigirle a una agencia de marketing digital real."
    canonical="https://eccomfyarg.com/blog/agencia-de-marketing-digital-cordoba"
    schema={getArticleSchema("Agencia de Marketing Digital en Córdoba: Cómo elegirla", "/blog/agencia-de-marketing-digital-cordoba")}
    h1="Agencia de Marketing Digital en Córdoba: Cómo elegir la correcta"
    path="/blog/agencia-de-marketing-digital-cordoba"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Agencia Córdoba", url: "https://eccomfyarg.com/blog/agencia-de-marketing-digital-cordoba" }
    ]}
/>;

export const BlogMetaAdsCoaches = () => <SeoPageTemplate
    title="Meta Ads para Coaches y Mentores: Guía Paso a Paso | Blog Ecomfy"
    description="El rubro del coaching está saturado. Para destacar y llenar tu agenda debes dominar Meta Ads usando embudos de venta comprobados. Conoce la fórmula acá."
    canonical="https://eccomfyarg.com/blog/meta-ads-para-coaches-y-mentores"
    schema={getArticleSchema("Meta Ads para Coaches y Mentores: Guía Paso a Paso", "/blog/meta-ads-para-coaches-y-mentores")}
    h1="Meta Ads para Coaches y Mentores: Guía Paso a Paso"
    path="/blog/meta-ads-para-coaches-y-mentores"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Meta Ads Coaches", url: "https://eccomfyarg.com/blog/meta-ads-para-coaches-y-mentores" }
    ]}
/>;

export const BlogMarcaPersonal = () => <SeoPageTemplate
    title="Cómo Posicionar tu Marca Personal en Google | Blog Ecomfy"
    description="Tener miles de seguidores en Instagram no asegura autoridad en motores de búsqueda. Te contamos las claves para posicionar tu nombre y firma en Google con SEO."
    canonical="https://eccomfyarg.com/blog/como-posicionar-marca-personal-en-google"
    schema={getArticleSchema("Cómo Posicionar tu Marca Personal en Google", "/blog/como-posicionar-marca-personal-en-google")}
    h1="Cómo Posicionar tu Marca Personal en Google"
    path="/blog/como-posicionar-marca-personal-en-google"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Marca Personal Google", url: "https://eccomfyarg.com/blog/como-posicionar-marca-personal-en-google" }
    ]}
/>;

export const BlogInfoproductoresLatam = () => <SeoPageTemplate
    title="Marketing Digital para Infoproductores en LATAM | Blog Ecomfy"
    description="Existen estrategias que funcionan para USA pero no para Latinoamérica. Te explicamos los métodos de venta de infoproductos que sí están facturando en nuestra región."
    canonical="https://eccomfyarg.com/blog/marketing-para-infoproductores-latam"
    schema={getArticleSchema("Marketing Digital para Infoproductores en LATAM", "/blog/marketing-para-infoproductores-latam")}
    h1="Marketing Digital para Infoproductores en LATAM"
    path="/blog/marketing-para-infoproductores-latam"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Infoproductores LATAM", url: "https://eccomfyarg.com/blog/marketing-para-infoproductores-latam" }
    ]}
/>;

export const BlogAgenciaFreelancer = () => <SeoPageTemplate
    title="Agencia de Marketing vs Freelancer: Qué Conviene | Blog Ecomfy"
    description="Es la duda eterna del emprendedor. Analizamos objetivamente los pros, los contras y el momento exacto para contratar a un freelancer o pasar a una agencia."
    canonical="https://eccomfyarg.com/blog/diferencia-agencia-freelancer-marketing"
    schema={getArticleSchema("Agencia de Marketing vs Freelancer: Qué Conviene", "/blog/diferencia-agencia-freelancer-marketing")}
    h1="Agencia de Marketing vs Freelancer: Qué Conviene para tu Negocio"
    path="/blog/diferencia-agencia-freelancer-marketing"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Agencia vs Freelancer", url: "https://eccomfyarg.com/blog/diferencia-agencia-freelancer-marketing" }
    ]}
/>;

export const BlogLeadsCalificados = () => <SeoPageTemplate
    title="Cómo Generar Leads Calificados para Servicios Digitales | Blog Ecomfy"
    description="Tener cientos de mensajes preguntando 'precio' no sirve si ninguno compra. Aprendé a filtrar tu tráfico e inyectar exclusividad para generar leads cualificados."
    canonical="https://eccomfyarg.com/blog/como-generar-leads-calificados-para-servicios"
    schema={getArticleSchema("Cómo Generar Leads Calificados para Servicios Digitales", "/blog/como-generar-leads-calificados-para-servicios")}
    h1="Cómo Generar Leads Calificados para Servicios Digitales"
    path="/blog/como-generar-leads-calificados-para-servicios"
    isArticle
    breadcrumbs={[
        { name: "Inicio", url: "https://eccomfyarg.com/" },
        { name: "Blog", url: "https://eccomfyarg.com/blog" },
        { name: "Leads Calificados", url: "https://eccomfyarg.com/blog/como-generar-leads-calificados-para-servicios" }
    ]}
/>;

