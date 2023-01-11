/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: config => {
    config.resolve.modules.push(path.resolve('./src'));
    config.module.rules.push(
      ...[
        {
          test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2|jpeg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000000
            }
          },
        }
      ]
    );

    // config.plugins.push(new BundleAnalyzerPlugin())

    return config;
  }
}

module.exports = nextConfig
