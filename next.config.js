/* eslint-disable @typescript-eslint/no-require-imports */
// next.config.js
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@api': path.resolve(__dirname, 'api'),
    };
    return config;
  },
};
