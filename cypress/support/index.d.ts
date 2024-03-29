// // type definitions for Cypress object "cy"
// /// <reference types="cypress" />

// // type definitions for custom commands like "createDefaultTodos"
// /// <reference types="../support" />

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       /**
//        * Custom command to select DOM element by data-cy attribute.
//        * @example cy.dataCy('greeting')
//        */
//       dataCy(value: string): Chainable<JQuery<HTMLElement>>;
//     }
//   }
// }

// cypress/support/index.ts
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       /**
//        * Custom command to type a few random words into input elements
//        * @param count=3
//        * @example cy.get('input').typeRandomWords()
//        */
//       typeRandomWords(
//         count?: number,
//         options?: Partial<TypeOptions>
//       ): Chainable<JQuery<HTMLElement>>;
//     }
//   }
// }

///// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getSessionStorage(key: string): Chainable<any>;
    setSessionStorage(key: string, value: string): Chainable<any>;

    checkToken(token: string): Chainable<any>;
    clickLink(lbl: string): Chainable<any>;
    login(email: string, password: string);

    parentLogin(email: string, password: string): Chainable<any>;
    /**
     * Create several Todo items via UI
     * @example
     * cy.createDefaultTodos()
     */
    createDefaultTodos(): Chainable<any>;
    /**
     * Creates one Todo using UI
     * @example
     * cy.createTodo('new item')
     */
    createTodo(title: string): Chainable<any>;

    /**
     * Command that injects Axe core library into app html.
     * @example
     *  cy.visit('/')
     *  cy.v()
     */
    addAxeCode(): Chainable<any>;

    typeTab(shiftKey: string, ctrlKey: string): Chainable<any>;

    loginViaUi(user: {
      email: string;
      password: string;
      name: string;
    }): Chainable<any>;

    logout(): Chainable<any>;
  }
}
