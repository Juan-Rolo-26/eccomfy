import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    schema?: object | object[];
}

export const SEOHead = ({
    title,
    description,
    canonical,
    ogImage = "https://eccomfyarg.com/images/og-ecomfy.jpg",
    schema
}: SEOHeadProps) => {
    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="es_AR" />

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
