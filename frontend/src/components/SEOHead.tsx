import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    schema?: object | object[];
    noindex?: boolean;
    articleMeta?: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
        section?: string;
    };
}

export const SEOHead = ({
    title,
    description,
    canonical,
    ogImage = "https://eccomfyarg.com/images/og-ecomfy.jpg",
    schema,
    noindex = false,
    articleMeta
}: SEOHeadProps) => {
    const isArticle = !!articleMeta;

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:site_name" content="Ecomfy" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={isArticle ? "article" : "website"} />
            <meta property="og:locale" content="es_AR" />

            {/* Article-specific OG */}
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

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Schema.org JSON-LD */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
