module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'middlewares/**/*.js',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  setupFiles: ['./test/setup.js'],
};
