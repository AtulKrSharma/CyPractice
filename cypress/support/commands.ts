// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => {
    cy.log(`keyValue: ${window.sessionStorage.getItem(key)}`);
  });
});

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});

Cypress.Commands.add('checkToken', (token) => {
  cy.window().its('localStorage.token').should('eq', token);
});

Cypress.Commands.add('parentLogin', (email, password) => {
  cy.log(`Combo: ${email} & ${password}`);
});

Cypress.Commands.add('clickLink', (lbl) => {
  cy.get('a').contains(lbl, { matchCase: false }).click({ force: true });
});

Cypress.Commands.add('login', (email, pw) => {
  cy.visit('/login'); // Visit the login page
  cy.get('#email').type(email); // Enter the email
  cy.get('#password').type(pw); // Enter the password
  cy.get('form').submit(); // Submit the login form
});

//function (a,b){return a+b}

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add(
  'typeRandomWords',
  { prevSubject: 'element' },
  (subject /* :JQuery<HTMLElement> */, count = 3, options?) => {
    return cy.wrap(subject).type(generateRandomWords(count), options);
  }
);

Cypress.Commands.overwrite<'type', 'element'>(
  'type',
  (originalFn, element, text, options?: Partial<TypeOptions>) => {
    if (options && options.sensitive) {
      // turn off original log
      options.log = false;
      // create our own log with masked message
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }

    return originalFn(element, text, options);
  }
);

//
Cypress.Commands.add('createDefaultTodos', function () {
  let TODO_ITEM_ONE = 'buy some cheese';
  let TODO_ITEM_TWO = 'feed the cat';
  let TODO_ITEM_THREE = 'book a doctors appointment';

  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  let cmd = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps() {
      // we're creating our own custom message here
      // which will print out to our browsers console
      // whenever we click on this command
      return {
        'Inserted Todos': [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
      };
    },
  });

  // additionally we pass {log: false} to all of our
  // sub-commands so none of them will output to
  // our command log

  cy.get('.new-todo', { log: false })
    .type(`${TODO_ITEM_ONE}{enter}`, { log: false })
    .type(`${TODO_ITEM_TWO}{enter}`, { log: false })
    .type(`${TODO_ITEM_THREE}{enter}`, { log: false });

  cy.get('.todo-list li', { log: false }).then(function ($listItems) {
    // once we're done inserting each of the todos
    // above we want to return the .todo-list li's
    // to allow for further chaining and then
    // we want to snapshot the state of the DOM
    // and end the command so it goes from that
    // 'spinning blue state' to the 'finished state'
    cmd.set({ $el: $listItems }).snapshot().end();
  });

  // return a query for the todo items so that we can
  // alias the result of this command in our tests
  return cy.get('.todo-list li', { log: false });
});

Cypress.Commands.add('createTodo', function (todo) {
  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps() {
      return {
        'Inserted Todo': todo,
      };
    },
  });

  // create the todo
  cy.get('.new-todo', { log: false }).type(`${todo}{enter}`, { log: false });

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  cy.get('.todo-list', { log: false })
    .contains('li', todo.trim(), { log: false })
    .then(function ($li) {
      // set the $el for the command so
      // it highlights when we hover over
      // our command
      cmd.set({ $el: $li }).snapshot().end();
    });

  // return a query for the todo items so that we can
  // alias the result of this command in our tests
  return cy
    .get('.todo-list', { log: false })
    .contains('li', todo.trim(), { log: false });
});

Cypress.Commands.add('addAxeCode', () => {
  cy.window({ log: false }).then((win) => {
    return new Promise((resolve) => {
      const script = win.document.createElement('script');

      script.src = '/node_modules/axe-core/axe.min.js';
      script.addEventListener('load', resolve);

      win.document.head.appendChild(script);
    });
  });
});

Cypress.Commands.add('typeTab', (shiftKey, ctrlKey) => {
  cy.focused().trigger('keydown', {
    keyCode: 9,
    which: 9,
    shiftKey: shiftKey,
    ctrlKey: ctrlKey,
  });
});
