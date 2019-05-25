module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "mocha",
    transpilers: [],
    testFramework: "mocha",
    coverageAnalysis: "perTest",
    mutate: ["./api/**/*.js","./utils/**/*.js", "./*.js","!./api/**/*.test.js"],
    files: ["./api/**/*.js","./utils/**/*.js", "./*.js","./test/*.js"]
  });
};
