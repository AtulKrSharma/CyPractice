export const get = (
  subject: any,
  selector: string,
  options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
): Chainable<JQuery<HTMLElement>> => {
  const timeout = Cypress.config('defaultCommandTimeout');

  const log = Cypress.log({
    $el: subject,
    name: 'get',
    consoleProps() {
      return {
        selector,
        options,
      };
    },
  });

  return Promise.try(() => {
    const userOptions = options || {};

    const userTimeout =
      userOptions.timeout != null ? userOptions.timeout : timeout;

    if (!subject) {
      log.set({
        state: 'failed',
        error: new Error(
          '`cy.get()` failed because it requires a DOM element.'
        ),
      });

      return;
    }

    return Promise.try(() => {
      return _get(selector, subject, userTimeout);
    }).catch((err) => {
      log.set({ state: 'failed', error: err });

      throw err;
    });
  })
    .then((el) => {
      return Cypress.$(el);
    })
    .then((el) => {
      log.snapshot('after');

      return el;
    });
};
