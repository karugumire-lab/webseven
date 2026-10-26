const nextConfig = {
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/:page.html', destination: '/:page' },
    ];
  },
};

export default nextConfig;
