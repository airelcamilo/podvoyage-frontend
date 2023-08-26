/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' })
        return config
    },
    experimental: {
        outputFileTracingRoot: path.join(__dirname, '../../'),
        outputFileTracingExcludes: {
            '*': [
                'node_modules/canvas',
            ],
        },
    },
}

module.exports = nextConfig
