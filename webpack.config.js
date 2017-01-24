/* eslint-disable */

function buildConfig(env) {
  return require('./build/' + env + '.js')({ env: env });
}

module.exports = buildConfig;
