const path = require('path');

const sourceRoot = './src';
const moduleRoot = 'crm';

module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-modules-amd', {
      noInterop: false,
    }],
  ],
  moduleIds: true,
  getModuleId: function getModuleId(name) {
    // Remove the absolute directory from the module name
    const sourceDirectory = path.resolve(sourceRoot).replace(/\\/gi, path.posix.sep);
    return name.replace(sourceDirectory, moduleRoot);
  },
};
