module.exports = function (wallaby) {

  // Babel needs this
  process.env.NODE_ENV = 'development';

  return {
    files: [
      'src/**/*.js',
      'src/**/*.jsx',
      '!src/**/*.spec.js',
      '!src/**/*.spec.jsx'
    ],

    tests: ['src/**/*.spec.js', 'src/**/*.spec.jsx'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      })
    },

    setup: (wallaby) => {
      wallaby.testFramework.configure({
        // as in node_modules/react-scripts/utils/createJestConfig.js
        moduleNameMapper: {
          '^.+\\.(jpg|jpeg|png|gif|svg)$': require.resolve('react-scripts/config/jest/fileTransform.js'),
          '^.+\\.css$': require.resolve('react-scripts/config/jest/cssTransform.js')
        }
      });
    },

    testFramework: 'jest'
  };
};
