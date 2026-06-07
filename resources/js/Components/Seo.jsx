import { Head, usePage } from '@inertiajs/react';

function absoluteUrl(value, siteUrl) {
    if (!value) return siteUrl;

    try {
        return new URL(value, `${siteUrl}/`).toString();
    } catch {
        return value;
    }
}

export default function Seo({
    title,
    description,
    image,
    type = 'website',
    noIndex = false,
}) {
    const page = usePage();
    const {
        siteName = 'PPAIP Universitas Bakrie',
        siteUrl = 'http://localhost',
        defaultImage = '/assets/bakrie-banner.jpg',
    } = page.props.seo || {};
    const normalizedSiteUrl = siteUrl.replace(/\/+$/, '');
    const canonicalPath = page.url.split('?')[0].split('#')[0];
    const canonicalUrl = absoluteUrl(canonicalPath, normalizedSiteUrl);
    const imageUrl = absoluteUrl(image || defaultImage, normalizedSiteUrl);
    const fullTitle = title.includes(siteName)
        ? title
        : `${title} - ${siteName}`;

    return (
        <Head title={title}>
            <meta head-key="description" name="description" content={description} />
            <meta
                head-key="robots"
                name="robots"
                content={noIndex ? 'noindex, nofollow' : 'index, follow'}
            />
            <link head-key="canonical" rel="canonical" href={canonicalUrl} />

            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:site_name" property="og:site_name" content={siteName} />
            <meta head-key="og:title" property="og:title" content={fullTitle} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            <meta head-key="og:image" property="og:image" content={imageUrl} />

            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content={fullTitle} />
            <meta head-key="twitter:description" name="twitter:description" content={description} />
            <meta head-key="twitter:image" name="twitter:image" content={imageUrl} />
        </Head>
    );
}
