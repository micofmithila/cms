export default function manifest() {
    return {
        name: 'Mic of Mithila - Open Mic Platform in Madhubani, Bihar',
        short_name: 'Mic of Mithila',
        description: 'MIC of Mithila is a platform based in Madhubani, Bihar, that provides an open mic stage for artists and talented individuals. It serves as a creative space for people to showcase their skills in poetry, storytelling, singing, stand-up comedy, and other performing arts.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#4F46E5',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: "/apple-icon.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
    }
}