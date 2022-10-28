/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            // for album pictures
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/image/**',
            },
            // for song previews
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/mp3-preview/**',
            },
        ],
    },
}

module.exports = nextConfig
