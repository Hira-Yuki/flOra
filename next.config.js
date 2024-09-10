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
      '@lib': path.resolve(__dirname, 'lib'),
      '@constants': path.resolve(__dirname, 'constants'),
    };
    return config;
  },
};
