module.exports = {
  verbose: true,
  testRegex: '(/__tests__/.*(test))\\.js$',
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/resources/*',
    '!jest.config.js',
  ],
  // we need it to be able to run tests using node instead of use jsdom adapter
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: './jest.setup.js',
};
