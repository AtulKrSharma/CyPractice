//https://www.youtube.com/watch?v=8nhCF_Jc45k&list=PLXgRgGX8-5UXwV_jcOx2I4pxaSMzQdLiN&index=5

describe('read adn write csv file using fast csv', () => {
  const csvUploaded = 'cypress/fixtures/employees.csv';

  describe('My First Test', function () {
    it.only('Visits the Kitchen Sink', function () {
      cy.visit('https://example.cypress.io');
      cy.contains('type').then(($el) => {
        var data = 'inService, 30';
        cy.task('log', data);
      });
    });
  });

  it('iterate through csv file', () => {
    cy.fixture('employees.csv', 'utf-8')
      .then((txt) => txt.split('\n').map((row) => row.trim())) // string to array of rows
      .then((rows) => {
        const data = rows
          .slice(1) // remove headers
          .map(
            (row) =>
              row
                .split('|') // split each row
                .filter(Boolean) // ignore start and end "|"
                .map((col) => col.trim()) // remove whitespace
          )
          .filter((row) => row.length); // remove empty rows
        return data;
      })
      //   .should('deep.eq', [
      //     ['john', 'pword1'],
      //     ['james', 'myPassword'],
      //     ['frank', 'newPassword'],
      //   ])
      .each((row) => {
        console.log(row);
      });
  });

  it.skip('CSV test-read file', () => {
    cy.readFile(csvUploaded, 'utf-8', { log: true }).then((txt) => {
      cy.log(txt);
      cy.log(typeof txt);
    });
  });

  it.skip('CSV test-fixture', () => {
    cy.fixture('employees', 'utf-8').then((txt) => {
      cy.log(txt);
      cy.log(typeof txt);
    });
  });

  it.skip('read data', () => {
    cy.task('readFromCsv').then((result) => {
      console.log(result);
    });
  });
});
