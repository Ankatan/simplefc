// Update frame metadata on page load
document.addEventListener('DOMContentLoaded', () => {
    // Process URLs like PHP version
    const frame = {...config.frame};
    frame.imageUrl = config.appUrl + frame.imageUrl;
    frame.button.action.url = config.appUrl;
    frame.button.action.splashImageUrl = config.appUrl + frame.button.action.splashImageUrl;

    // Generate metadata like PHP version
    const generateMetadata = (frame, config, appUrl) => {
        const imageUrl = frame.imageUrl;
        return {
            title: config.metadata.openGraph.title,
            openGraph: {
                ...config.metadata.openGraph,
                url: appUrl,
                image: imageUrl
            },
            twitter: {
                ...config.metadata.twitter,
                image: imageUrl
            },
            other: {
                'fc:frame': JSON.stringify(frame)
            }
        };
    };

    const metadata = generateMetadata(frame, config, config.appUrl);
    const fcTag = metadata.other['fc:frame'].replace(/"/g, '&quot;');

    // Update all metadata tags
    document.title = metadata.title;
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

    // Wait for the iframe to fully load before signaling readiness
    document.getElementById('main-frame').addEventListener('load', () => {
        if (window.frame && window.frame.sdk && window.frame.sdk.actions) {
            frame.sdk.actions.ready();
        }
    });
});
