const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports/mochawesome-json",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: "Axur Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    code: false,
  },

  video: false,
  screenshotsFolder: "cypress/reports/screenshots",

  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {

      on('file:preprocessor', cucumber());

      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },

    specPattern: 'cypress/integration/**/*.feature',
    supportFile: 'cypress/support/index.js'
  },
});
