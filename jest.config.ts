module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/packages/*/lib/'],
  coverageDirectory: '.qodana/code-coverage/',
  coverageReporters: ['lcovonly']
};
