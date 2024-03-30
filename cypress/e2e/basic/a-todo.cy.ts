/// <reference types="cypress" />

import { myDummy } from '@utils/dummy';

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    myDummy;

    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://demoblaze.com/');
    cy.getCookie('user');
    cy.setCookie('heroName', 'atul');
  });

  it('my dummy test1 ', () => {
    cy.log('before');
    cy.parentLogin('Atul', 'Sharma');
    cy.setSessionStorage('cyPress', '3215');
    cy.log('after');
    cy.getSessionStorage('cyPress');
  });

  it.only('my dummy test2 ', () => {
    cy.loginViaUi({
      email: 'fake@email.com',
      password: '$ecret1',
      name: 'johndoe',
    });
    cy.get('a').click();
  });
});
