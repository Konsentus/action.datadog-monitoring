module.exports = {
  clearMocks: true,
  testURL: 'http://localhost/',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'src/index.js',
    'src/config/string-constants.js',
    'src/config/config.dev.js',
    'src/config/config.prod.js',
    'src/utils/gatewayAccessLogger/index.js',
  ],
  modulePaths: ['<rootDir>/node_modules', '<rootDir>/'],
};
