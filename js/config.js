const config = {
    appUrl: "https://ar-io.dev/Xj-PFsKveBvs6nNIYYJFzlCl2Ti3PFgTnQV-kFP0hQM",
    targetUrl: "https://ar-io.dev/Xj-PFsKveBvs6nNIYYJFzlCl2Ti3PFgTnQV-kFP0hQM",
    frame: {
        version: "next",
        imageUrl: "/assets/frame-splash.jpg",
        button: {
            title: "Aluisyo's Site",
            action: {
                type: "launch_frame",
                name: "Aluisyo Linktree",
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
            title: "Aluisyo's Site",
            description: "In the realm of artistic creation, the computer becomes my canvas, and code, my brush. With each stroke of programming, I intricately weave the threads of imagination, transforming abstract ideas into tangible visual wonders.",
            imageAlt: "Aluisyo's Site",
            imageWidth: "800",
            imageHeight: "600",
            imageType: "image/png"
        },
        twitter: {
            imageAlt: "Aluisyo's Site",
            imageWidth: "800",
            imageHeight: "600",
            imageType: "image/png"
        }
    }
};
