// Update frame metadata on page load
document.addEventListener('DOMContentLoaded', () => {
    // Sanitize URLs exactly like PHP version
    const appUrl = new URL(config.appUrl || '', window.location.href).toString();
    const targetUrl = new URL(config.targetUrl || '', window.location.href).toString();

    // Default values like PHP version
    const defaultMetadata = {
        title: 'Default Title',
        description: 'Default Description'
    };

    // Process URLs exactly like PHP version
    const frame = {...config.frame};
    frame.imageUrl = appUrl + frame.imageUrl;
    frame.button.action.url = appUrl;
    frame.button.action.splashImageUrl = appUrl + frame.button.action.splashImageUrl;

    // Generate metadata exactly like PHP version
    const generateMetadata = (frame, config, appUrl) => {
        const imageUrl = frame.imageUrl;
        return {
            title: config.metadata?.openGraph?.title || defaultMetadata.title,
            openGraph: {
                ...(config.metadata?.openGraph || {}),
                url: appUrl,
                image: imageUrl
            },
            twitter: {
                ...(config.metadata?.twitter || {}),
                image: imageUrl
            },
            other: {
                'fc:frame': JSON.stringify(frame)
            }
        };
    };

    const metadata = generateMetadata(frame, config, appUrl);
    const fcTag = metadata.other['fc:frame'].replace(/"/g, '&quot;');

    // Update metadata tags exactly like PHP output
    document.querySelector('title').textContent = metadata.openGraph.title;
    document.querySelector('meta[property="og:title"]').content = metadata.openGraph.title;
    document.querySelector('meta[property="og:description"]').content = metadata.openGraph.description;
    document.querySelector('meta[property="og:url"]').content = metadata.openGraph.url;
    document.querySelector('meta[property="og:image"]').content = metadata.openGraph.image;
    document.querySelector('meta[property="og:image:alt"]').content = metadata.openGraph.imageAlt;
    document.querySelector('meta[property="og:image:width"]').content = metadata.openGraph.imageWidth;
    document.querySelector('meta[property="og:image:height"]').content = metadata.openGraph.imageHeight;
    document.querySelector('meta[property="og:image:type"]').content = metadata.openGraph.imageType;

    document.querySelector('meta[name="twitter:image"]').content = metadata.twitter.image;
    document.querySelector('meta[name="twitter:image:alt"]').content = metadata.twitter.imageAlt;
    document.querySelector('meta[name="twitter:image:width"]').content = metadata.twitter.imageWidth;
    document.querySelector('meta[name="twitter:image:height"]').content = metadata.twitter.imageHeight;
    document.querySelector('meta[name="twitter:image:type"]').content = metadata.twitter.imageType;

    document.querySelector('meta[name="fc:frame"]').content = fcTag;

    // Update second title tag and iframe title
    document.querySelector('head > title:last-of-type').textContent = metadata.title;
    document.getElementById('main-frame').title = metadata.openGraph.title;

    // Update SDK script source and iframe src with fallbacks like PHP
    const cdn = config.cdn || {};
    const fcsdk = cdn['farcaster-sdk'] || '';
    document.querySelector('script:not([src*="js/"])').src = fcsdk;
    document.getElementById('main-frame').src = targetUrl;

    // Wait for the iframe to fully load before signaling readiness
    document.getElementById('main-frame').addEventListener('load', () => {
        frame.sdk.actions.ready();
    });
});
