Cypress.Commands.add('logout', () => {
  Cypress.log({
    name: 'setSessionStorage',
    displayName: 'LogOut',
  });
  cy.contains('Login').should('not.exist');
  cy.get('.avatar').click();
  cy.contains('Logout').click();
  cy.get('h1').contains('Login');
  cy.getCookie('auth_key').should('not.exist');
});

Cypress.Commands.add('loginViaUi', (user) => {
  Cypress.log({
    name: 'setSessionStorage',
    displayName: 'loginViaUi',
  });
  cy.session(
    user,
    () => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      //cy.click('button#login');
      cy.get('h1').contains(`Welcome back ${user.name}!`);
    },
    {
      validate: () => {
        cy.getCookie('auth_key').should('exist');
      },
    }
  );
});
