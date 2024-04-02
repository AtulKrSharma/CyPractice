describe('task2', () => {
  it('read txt file', () => {
    cy.readFile('temp.txt', 'utf-8', { log: true }).then((content) => {
      cy.log(content);
    });
  });

  it('read csv file', () => {
    cy.readFile('cypress//fixtures//employees.csv', 'utf-8').then(
      (csvContent) => {
        cy.log(csvContent);
        expect(csvContent).to.contain('Pat');
      }
    );
  });
});
