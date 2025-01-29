/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' }, // Prevent MIME type sniffing
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // Prevent embedding in iframes
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" }, // Restrict embedding
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' }, // Control referrer information
          { 
            key: 'Strict-Transport-Security', 
            value: 'max-age=31536000; includeSubDomains; preload' 
          }, 
          { 
            key: 'Permissions-Policy', 
            value: "geolocation=(self), microphone=()" 
          }, 
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doc.repcohome.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "65.2.82.13/api",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
    ],
  },

  experimental: {
    turboMode:true,
    turbo: {
      resolveAlias: {
        '@/*': ['./src/*'],
      },
    },
    optimizeCss: true,
    scrollRestoration: true,
  },

  serverExternalPackages: ['mysql'],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  output: 'standalone',
};

export default nextConfig;
