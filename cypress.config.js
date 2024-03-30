const { defineConfig } = require('cypress');
const csv = require('@fast-csv/parse');

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
    baseUrl: 'www.demoblaze.com',
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('task', {
        readFromCsv() {
          return new Promise((resolve) => {
            let dataArray = [];
            csv.parseFile('./cypress/fixtures/employees.csv', {
              headers: true,
            });
            // on('before:spec', (data) => {
            //   dataArray.push(data);
            // });
            // on('before:spec', () => {
            //   resolve(dataArray);
            // });
          });
        },
      });
    },
    experimentalRunAllSpecs: true,
    specPattern: 'cypress/e2e/basic/**/*.cy.{js,jsx,ts,tsx}',
    //https://docs.cypress.io/guides/references/legacy-configuration#blockHosts
    blockHosts: ['hls.demoblaze.com'],
  },
});
