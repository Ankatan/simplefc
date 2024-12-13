const config = {
    appUrl: "https://compez.art/frame",
    targetUrl: "https://compez.art",
    frame: {
        version: "next",
        imageUrl: "/assets/frame-splash.jpg",
        button: {
            title: "Launch Compez's Site",
            action: {
                type: "launch_frame",
                name: "Compez's Art",
                url: "",
                splashImageUrl: "/assets/favicon-192.png",
                splashBackgroundColor: "#ffffff"
            }
        }
    },
    cdn: {
        "farcaster-sdk": "https://cdn.jsdelivr.net/npm/@farcaster/frame-sdk/dist/index.min.js",
        "bootstrap-css": "",
        "bootstrap-js": "",
        "wasm-qt": ""
    },
    metadata: {
        openGraph: {
            title: "Compez's Art",
            description: "In the realm of artistic creation, the computer becomes my canvas, and code, my brush. With each stroke of programming, I intricately weave the threads of imagination, transforming abstract ideas into tangible visual wonders.",
            imageAlt: "Compez's Art",
            imageWidth: "800",
            imageHeight: "600",
            imageType: "image/png"
        },
        twitter: {
            imageAlt: "Compez's Art",
            imageWidth: "800",
            imageHeight: "600",
            imageType: "image/png"
        }
    }
};
