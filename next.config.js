/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
        'res.cloudinary.com',
        'api.cloudinary.com',
        'books.google.com'
        ],
    },
}

module.exports = nextConfig
