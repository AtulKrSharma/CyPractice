const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Mocha-Mocha',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    videoOnFailOnly: true,
  },
  watchForFileChanges: true,
  retries: { runMode: 1, openMode: 1 },
  trashAssetsBeforeRuns: true,
  video: true,
  waitForAnimations: true,
  env: {
    FOO: 'bar',
  },
  e2e: {
    baseUrl: 'https://mail.yahoo.com',
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    experimentalRunAllSpecs: true,
    specPattern: 'cypress/e2e/basic/**/*.cy.{js,jsx,ts,tsx}',
  },
});
