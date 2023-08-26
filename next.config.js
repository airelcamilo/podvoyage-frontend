/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIgnores: ["**canvas**"],
    },
    webpack: (config) => {
        config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' })
        return config
    },
}

module.exports = nextConfig
