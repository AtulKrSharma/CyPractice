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

// not a super useful custom command
// but demonstrates how subject is passed
// and how the arguments are shifted
Cypress.Commands.add('console', { prevSubject: true }, (subject, method) => {
  // the previous subject is automatically received
  // and the commands arguments are shifted

  // allow us to change the console method used
  method = method || 'log';

  // log the subject to the console
  console[method]('The subject is', subject);

  // whatever we return becomes the new subject
  //
  // we don't want to change the subject so
  // we return whatever was passed in
  return subject;
});
