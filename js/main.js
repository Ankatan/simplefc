// Function to generate metadata
function generateMetadata() {
    const frame = config.frame;
    frame.imageUrl = config.appUrl + frame.imageUrl;
    frame.button.action.url = config.appUrl;
    frame.button.action.splashImageUrl = config.appUrl + frame.button.action.splashImageUrl;

    const metadata = {
        title: config.metadata.openGraph.title,
        openGraph: {
            ...config.metadata.openGraph,
            url: config.appUrl,
            image: frame.imageUrl
        },
        twitter: {
            ...config.metadata.twitter,
            image: frame.imageUrl
        },
        other: {
            'fc:frame': JSON.stringify(frame)
        }
    };

    return metadata;
}

// Function to set meta tags
function setMetaTags(metadata) {
    // Set title
    document.title = metadata.title;

    // Set Open Graph meta tags
    const ogTags = {
        'og:title': metadata.openGraph.title,
        'og:description': metadata.openGraph.description,
        'og:type': 'website',
        'og:url': metadata.openGraph.url,
        'og:image': metadata.openGraph.image,
        'og:image:alt': metadata.openGraph.imageAlt,
        'og:image:width': metadata.openGraph.imageWidth,
        'og:image:height': metadata.openGraph.imageHeight,
        'og:image:type': metadata.openGraph.imageType
    };

    // Set Twitter meta tags
    const twitterTags = {
        'twitter:image': metadata.twitter.image,
        'twitter:image:alt': metadata.twitter.imageAlt,
        'twitter:image:width': metadata.twitter.imageWidth,
        'twitter:image:height': metadata.twitter.imageHeight,
        'twitter:image:type': metadata.twitter.imageType
    };

    // Set Frame meta tag
    const frameTags = {
        'fc:frame': metadata.other['fc:frame']
    };

    // Function to set or create meta tag
    const setMetaTag = (name, content, property = false) => {
        let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (property) {
                meta.setAttribute('property', name);
            } else {
                meta.setAttribute('name', name);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    };

    // Set all meta tags
    Object.entries(ogTags).forEach(([key, value]) => setMetaTag(key, value, true));
    Object.entries(twitterTags).forEach(([key, value]) => setMetaTag(key, value));
    Object.entries(frameTags).forEach(([key, value]) => setMetaTag(key, value));
}

// Function to initialize the page
function initializePage() {
    // Generate metadata
    const metadata = generateMetadata();
    
    // Set meta tags
    setMetaTags(metadata);

    // Set iframe source
    const mainFrame = document.getElementById('main-frame');
    mainFrame.src = config.targetUrl;
    mainFrame.setAttribute('title', metadata.openGraph.title);
    mainFrame.setAttribute('aria-label', 'Main content frame');

    // Load Farcaster SDK
    if (config.cdn['farcaster-sdk']) {
        const script = document.createElement('script');
        script.src = config.cdn['farcaster-sdk'];
        script.onload = () => {
            // Wait for the iframe to fully load before signaling readiness
            mainFrame.addEventListener('load', () => {
                if (window.frame && window.frame.sdk && window.frame.sdk.actions) {
                    window.frame.sdk.actions.ready();
                }
            });
        };
        document.body.appendChild(script);
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
