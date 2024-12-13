// Update frame metadata on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create the full frame object with absolute URLs
    const frameData = {
        ...config.frame,
        imageUrl: new URL(config.frame.imageUrl, config.appUrl).href,
        button: {
            ...config.frame.button,
            action: {
                ...config.frame.button.action,
                url: config.appUrl,
                splashImageUrl: new URL(config.frame.button.action.splashImageUrl, config.appUrl).href
            }
        }
    };

    // Update the fc:frame meta tag
    const fcFrameMeta = document.querySelector('meta[name="fc:frame"]');
    if (fcFrameMeta) {
        fcFrameMeta.content = JSON.stringify(frameData);
    }

    // Wait for the iframe to fully load before signaling readiness
    document.getElementById('main-frame').addEventListener('load', () => {
        if (window.frame && window.frame.sdk && window.frame.sdk.actions) {
            frame.sdk.actions.ready();
        }
    });
});
