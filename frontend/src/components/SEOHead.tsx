import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    ogImageAlt?: string;
    schema?: object | object[];
    noindex?: boolean;
    articleMeta?: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
        section?: string;
        tags?: string[];
    };
    breadcrumbs?: Array<{ name: string; url: string }>;
}

const SITE_NAME = 'Eccomfy';
const DEFAULT_OG_IMAGE = 'https://eccomfyarg.com/og-eccomfy.jpg';
const BASE_URL = 'https://eccomfyarg.com';

export const SEOHead = ({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogImageAlt,
    schema,
    noindex = false,
    articleMeta,
    breadcrumbs,
}: SEOHeadProps) => {
    const isArticle = !!articleMeta;
    const resolvedOgImageAlt = ogImageAlt ?? `${SITE_NAME} — Agencia de Software para PyMEs en Córdoba Argentina`;

    // Construir schema de BreadcrumbList si se proporcionan
    const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Inicio',
                    'item': BASE_URL + '/',
                },
                ...breadcrumbs.map((crumb, index) => ({
                    '@type': 'ListItem',
                    'position': index + 2,
                    'name': crumb.name,
                    'item': crumb.url,
                })),
            ],
        }
        : null;

    // Construir schema WebPage dinámico
    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': isArticle ? 'Article' : 'WebPage',
        '@id': `${canonical}#webpage`,
        'url': canonical,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${BASE_URL}/#website` },
        'inLanguage': 'es-AR',
        ...(isArticle && articleMeta?.publishedTime ? { 'datePublished': articleMeta.publishedTime } : {}),
        ...(isArticle && articleMeta?.modifiedTime ? { 'dateModified': articleMeta.modifiedTime } : {}),
        ...(isArticle && articleMeta?.author
            ? { 'author': { '@type': 'Person', 'name': articleMeta.author } }
            : { 'author': { '@id': `${BASE_URL}/#organization` } }),
    };

    // Combinar todos los schemas en un array
    const allSchemas = [
        webPageSchema,
        ...(breadcrumbSchema ? [breadcrumbSchema] : []),
        ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
    ];

    return (
        <Helmet>
            {/* ── Charset y viewport (redundantes con index.html pero necesarios para SSR/pre-render) */}
            <html lang="es" />

            {/* ── Standard SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />

            {/* ── Open Graph / Facebook / LinkedIn / WhatsApp */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={resolvedOgImageAlt} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={isArticle ? 'article' : 'website'} />
            <meta property="og:locale" content="es_AR" />

            {/* ── Article-specific OG */}
            {articleMeta?.publishedTime && (
                <meta property="article:published_time" content={articleMeta.publishedTime} />
            )}
            {articleMeta?.modifiedTime && (
                <meta property="article:modified_time" content={articleMeta.modifiedTime} />
            )}
            {articleMeta?.author && (
                <meta property="article:author" content={articleMeta.author} />
            )}
            {articleMeta?.section && (
                <meta property="article:section" content={articleMeta.section} />
            )}
            {articleMeta?.tags?.map((tag) => (
                <meta key={tag} property="article:tag" content={tag} />
            ))}

            {/* ── Twitter / X Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@eccomfyarg" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={resolvedOgImageAlt} />

            {/* ── Schema.org JSON-LD — todos los schemas combinados */}
            <script type="application/ld+json">
                {JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas)}
            </script>
        </Helmet>
    );
};
