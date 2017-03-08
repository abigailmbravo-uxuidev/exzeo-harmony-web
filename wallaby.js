/* eslint global-require:0 import/no-extraneous-dependencies:0 */
module.exports = wallaby => ({
  files: [
    { pattern: './utils/testSetup/*.js*', instrument: false },
    { pattern: './**/*.svg', instrument: false },
    { pattern: './**/*.css', instrument: false },
    'src/**/*.js*',
    '!src/**/*.spec.js'
  ],
  tests: [
    'src/**/*.spec.js'
  ],
  setup: () => {
    require('./utils/testSetup');
  },
  compilers: {
    '**/*.js*': wallaby.compilers.babel({ babel: require('babel-core') })
  },
  env: {
    type: 'node',
    runner: 'node'
  }
});
