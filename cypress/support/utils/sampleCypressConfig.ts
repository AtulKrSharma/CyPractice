const { defineConfig } = require('cypress');
const converter = require('json-2-csv');
const csv = require('csv-parser');
const fs = require('fs');
const { default: Helper } = require('./cypress/e2e/utils/Helper');
const csvToJson1 = require('convert-csv-to-json');
const helper = require('csvtojson');

module.exports = defineConfig({
  chromeWebSecurity: false,
  watchFileForChanges: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 50000,
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'dd_mm_yy_HH_MM_ss',
    reportDir: 'cypress/reports/mochawesome-report',
  },

  e2e: {
    //To invoke test runner to pick files from the below path
    specPattern: 'cypress/e2e/**/*.cy.js',

    setupNodeEvents(on, config) {
      // implement node event listeners here
      // return require('./cypress/plugins/index.js')(on, config)
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config

      require('@cypress/code-coverage/task')(on, config);

      //Start full screen
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(launchOptions.args);
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--start-fullscreen');
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.fullscreen = true;
        }
        return launchOptions;
      });

      //Convert CSV to JSON
      on('task', {
        csvToJson(data) {
          var lines = data.split('\n');
          var result = [];
          var headers = lines[0].split(',');
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j].replace(/["']/g, '');
            }
            result.push(obj);
          }
          console.log(result);
          return result;
        },
      });

      // Write updated csv data into file
      on('task', {
        finalCsv(updatedJSON) {
          converter
            .json2csvAsync(updatedJSON)
            .then((updatedCsv) => {
              fs.writeFileSync(
                'cypress/fixtures/finalCsvToBeUploaded.csv',
                updatedCsv
              );
            })
            .catch((err) => console.log(err));
          return null;
        },
      });

      //For log purpose; prints message in the console
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      on('task', {
        updateCsvData({ csvData, finalJsonArray }) {
          let updatedJSON,
            orderIds = [];
          for (let i = 0; i < finalJsonArray.length; i++) {
            if ('orderId' in csvData) {
              orderIds[i] = csvData.orderId;
              finalJsonArray[i]['Order ID'] = csvData.orderId;
            } else {
              // orderIds[i] = 'OrderId_' + helper.getCurrentDateAndTimeInMiliseconds();
              orderIds[i] = 'OrderId_' + Date.now();
              finalJsonArray[i]['Order ID'] = orderIds[i];
            }

            if ('orderDate' in csvData) {
              finalJsonArray[i]['Order Date'] = csvData.orderDate;
            }
            if ('homebaseExecutionDate' in csvData) {
              finalJsonArray[i]['Homebase Execution Date'] =
                csvData.homebaseExecutionDate;
            }
            if ('customerExecutionDate' in csvData) {
              finalJsonArray[i]['Customer Execution Date'] =
                csvData.customerExecutionDate;
            }
          }
          updatedJSON = finalJsonArray;
          return updatedJSON;
        },
      });

      on('task', {
        updateCsvFile(csvData) {
          const finalJsonArray = [];
          let updatedJSON,
            orderIds = [];

          //readFile
          fs.createReadStream('cypress/fixtures/referenceCsvFile.csv')
            .pipe(csv())
            .on('data', (data) => finalJsonArray.push(data))
            .on('end', () => {
              console.log(finalJsonArray); // CSV converted to json object

              //Logic to update json objects; for loop to update csv columns in json array
              for (let i = 0; i < finalJsonArray.length; i++) {
                if ('orderId' in csvData) {
                  orderIds[i] = csvData.orderId;
                  finalJsonArray[i]['Order ID'] = csvData.orderId;
                } else {
                  orderIds[i] =
                    'OrderId_' + this.getCurrentDateAndTimeInMiliseconds();
                  finalJsonArray[i]['Order ID'] = orderIds[i];
                }

                if ('orderDate' in csvData) {
                  finalJsonArray[i]['Order Date'] = csvData.orderDate;
                }
                if ('homebaseExecutionDate' in csvData) {
                  finalJsonArray[i]['Homebase Execution Date'] =
                    csvData.homebaseExecutionDate;
                }
                if ('customerExecutionDate' in csvData) {
                  finalJsonArray[i]['Customer Execution Date'] =
                    csvData.customerExecutionDate;
                }
              }

              updatedJSON = finalJsonArray;
              converter
                .json2csvAsync(updatedJSON)
                .then((csvFile) => {
                  fs.writeFileSync('cypress/fixtures/' + fileName, csvFile);
                })
                .catch((err) => console.log(err));
            });
          return orderIds;
        },
      });
      return config;
    },
  },
});
