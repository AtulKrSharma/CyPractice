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
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to type a few random words into input elements
       * @param count=3
       * @example cy.get('input').typeRandomWords()
       */
      typeRandomWords(
        count?: number,
        options?: Partial<TypeOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
