export const click = (
  subject: any,
  options?: Partial<Loggable & Timeoutable & Withinable & Shadow & Forceable>
): Chainable<JQuery<HTMLElement>> => {
  const log = Cypress.log({
    $el: subject,
    name: 'click',
    consoleProps() {
      return {
        'Applied To': subject.get(0),
      };
    },
  });

  const userOptions = options || {};
  const { force } = userOptions;

  const clickOptions: ClickOptions = {
    force,
  };

  return Promise.try(() => {
    return _click(subject, clickOptions);
  })
    .catch((err) => {
      log.set({ state: 'failed', error: err });

      throw err;
    })
    .then((el) => {
      log.snapshot('after');

      return el;
    });
};
