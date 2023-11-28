const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The base URL of your API
    createProxyMiddleware({
      target: 'http://localhost:3500', // The actual server address where your API is running
      changeOrigin: true,
    })
  );
};
