describe('Users from CSV', () => {
  const csv = require('../../fixtures/employees.csv');
  beforeEach(() => {
    //cy.visit('index.html');
  });

  csv.forEach((user) => {
    it(`has the user ${user['FIRST_NAME']} ${user['EMPLOYEE_ID']}`, () => {
      //   cy.contains('td[data-cy=userId]', user['user id'])
      //     .parent('tr')
      //     .within(() => {
      //       cy.contains('td[data-cy=firstName]', user['FIRST_NAME']);
      //       cy.contains('td[data-cy=lastName]', user['EMPLOYEE_ID']);
      //     });
    });
  });
});
