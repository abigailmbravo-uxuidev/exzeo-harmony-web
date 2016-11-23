/* eslint global-require:0 import/no-extraneous-dependencies:0 */
module.exports = wallaby => ({
  files: [
    { pattern: './test/setup/*.js*', instrument: false },
    { pattern: './**/*.svg', instrument: false },
    { pattern: './**/*.css', instrument: false },
    'src/**/*.js*',
  ],
  tests: [
    'test/**/*.test.js',
  ],
  setup: () => {
    require('./test/setup/testSetup');
  },
  // teardown: () => {
  //   require('mockery').disable();
  // },
  compilers: {
    '**/*.js*': wallaby.compilers.babel({ babel: require('babel-core') }),
  },
  env: {
    type: 'node',
  },
});
