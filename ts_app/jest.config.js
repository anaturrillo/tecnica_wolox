module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testPathIgnorePatterns: './.stryker-tmp/*'
};
