const { defineConfig } = require('cypress');

module.exports = defineConfig({
  ///
  //import { defineConfig } from 'cypress';
  //default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    specPattern: 'cypress/e2e/A-Practicals/**/*.cy.{js,jsx,ts,tsx}',
  },
});
