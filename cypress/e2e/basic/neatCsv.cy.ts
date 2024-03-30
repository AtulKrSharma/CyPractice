import neatCsv = require('neat-csv');

let regData;

describe('using neat csv', function () {
  before(() => {
    cy.fixture('employees.csv', 'utf-8').then(neatCsv).as('csvData');
    // .then((data) => {
    //   regData = data;
    // });
  });

  beforeEach(function () {
    //cy.visit('https://www.jotform.com/build/240111273406442?s=templates'); // visit a web page
  });

  it('Fill the Registration Form for multiple users', () => {
    //cy.log(this.csvData);

    cy.get('@csvData').forEach((user) => {
      cy.log(`${user['FIRST_NAME']}:${user['LAST_NAME']}`);
    });
  });

  //for (let i = 0; i < regData.length; i++) {

  // cy.log(regData[i]['EMPLOYEE_ID']);
  // cy.log(regData[i]['FIRST_NAME']);
  // cy.log(regData[i]['LAST_NAME']);

  // cy.get('#first_3').type(regData[i]['firstName']);
  // cy.get('#last_3').type(regData[i]['lastName']);
  // cy.get('#input_4_addr_line1').type(regData[i]['address']);
  // cy.get('#input_4_addr_line2').type(regData[i]['address2']);
  // cy.get('#input_4_city').type(regData[i]['city']);
  // cy.get('#input_4_state').type(regData[i]['state']);
  // cy.get('#input_4_postal').type(regData[i]['postalCode']);
  // cy.get('#input_5_full').type(regData[i]['phone']);
  // cy.get('#input_6').type(regData[i]['email']);
  // cy.get('#input_25').click();
  // }
  // });
});
