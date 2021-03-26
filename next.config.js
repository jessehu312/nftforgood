const path = require('path');

module.exports = {
  distDir: 'build',
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));

    return config;
  }
}