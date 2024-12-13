// Update frame metadata on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create the frame data
    const frameData = {
        version: "vNext",
        image: config.appUrl + "/assets/frame-splash.jpg",
        buttons: [
            {
                label: "Aluisyo's Site",
                action: "link",
                target: config.targetUrl
            }
        ],
        postUrl: config.appUrl + "/api/frame"
    };

    // Set the frame metadata
    document.querySelector('meta[name="fc:frame"]').content = JSON.stringify(frameData);
    document.querySelector('meta[name="fc:frame:image"]').content = frameData.image;
    document.querySelector('meta[name="fc:frame:button:1"]').content = frameData.buttons[0].label;
    document.querySelector('meta[name="fc:frame:button:1:action"]').content = frameData.buttons[0].action;
    document.querySelector('meta[name="fc:frame:button:1:target"]').content = frameData.buttons[0].target;
    document.querySelector('meta[name="fc:frame:post_url"]').content = frameData.postUrl;

    // Update OpenGraph metadata
    document.querySelector('meta[property="og:image"]').content = frameData.image;
    document.querySelector('meta[property="og:url"]').content = config.appUrl;
    
    // Update Twitter metadata
    document.querySelector('meta[name="twitter:image"]').content = frameData.image;

    // Wait for the iframe to fully load before signaling readiness
    document.getElementById('main-frame').addEventListener('load', () => {
        if (window.frame && window.frame.sdk && window.frame.sdk.actions) {
            frame.sdk.actions.ready();
        }
    });
});
