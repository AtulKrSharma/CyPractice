//https://www.youtube.com/watch?v=8nhCF_Jc45k&list=PLXgRgGX8-5UXwV_jcOx2I4pxaSMzQdLiN&index=5

describe('read adn write csv file using fast csv', () => {
  const csvUploaded = 'cypress/fixtures/employees.csv';

  it('CSV test-read file', () => {
    cy.readFile(csvUploaded, 'utf-8', { log: true }).then((txt) => {
      cy.log(txt);
      cy.log(typeof txt);
    });
  });

  it('CSV test-fixture', () => {
    cy.fixture(csvUploaded, 'utf-8').then((txt) => {
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
