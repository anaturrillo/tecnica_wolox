module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "mocha",
    transpilers: [],
    testFramework: "mocha",
    commandRunner: {
      command: 'npm run stryker:mocha'
    },
    coverageAnalysis: "perTest",
    files: ["./utils/*.js", "./test/*.js", "./api/**/*.js", "./server.js", "./index.js", "./config.js"],
    mutate: ["./utils/*.js", "./api/**/*.js"]
  });
};
