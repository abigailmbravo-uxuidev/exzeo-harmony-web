# Cypress

## Getting started

This assumes you already have harmony-web
[configured](https://bitbucket.org/exzeo-usa/harmony-web/src/master/).

Confirm that the cypress url exists in `.env.local`
```bash
# uncomment to test cypress against sandbox environment
# REACT_APP_CYPRESS_URL=https://agency.harmony-ins.com
```
**This variable can me modified to point to various harmony environments.*

Run test suite

`npm run cypress` **run with the Test Runner*

`npm run cypress -- --headless` **run in headless mode*

### Run against HIT

Follow directions
[here](https://issuecenter.atlassian.net/wiki/spaces/SDLC/pages/577634574/Running+HIT)
to get HIT set up on your computer. 

Configure your front end to point to HIT by adjusting `.env.local`.

Run cypress as above.

---

### Docker

This assumes you have docker installed on your computer.

Modify `docker-compose.cypress.yml`.

Edit the environment variables similar to above.

Set `NPM_TOKEN` equal to the npm token from `.npmrc`.

Build docker image (if image is not already built)
```bash
$ docker-compose -f docker-compose.cypress.yml build
```

Start the container
```bash
$ docker-compose -f docker-compose.cypress.yml up
```

---

## Contributing

Take a look at the 
[Cypress Docs](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file).  
Cypress uses [Chai Assertions](https://www.chaijs.com/api/bdd/).  
Be sure to read the [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html).

The organization of the tests should be 
```
cypress/
  integration/
    [feature]/
      -[feature-test].spec.js
```

**Project Opinions**

To navigate to a page inside fo the app, use the `cy.quoteWorkflow()` fn detailed
in `support/quoteWorkflow`.

Whenever possible, use a reusable function listed in `support/inputs` or 
`support/utils`. This should cover the majority of test cases. **Favor `findDataTag()` over 
`get()`**. If you have to `get()` frequently, consider adding data-test tags into the 
harmony-web code itself. **When adding data-test tags, use dashes.**

When creating a test, place any reusable functions at the top, inside the describe.
For example, if you are always typing on the same inputs, this is a good place
to create a reusable call.

When using fixtures, if they are used more than once in the suite, alias them in the
`beforeEach()` call using `cy.fixture().as()`. If you do, your `it()` statement must
use the `function()` notation rather than arrow notation. In all other cases  -
including `before` and `beforeEach`, even when aliasing - use arrow notation.

Favor dot notation over callback notation. Only use `then` calls if necessary. A good
place for then calls is when waiting on async calls, such as either a network request
or getting a fixture from `cy/fixtures`. 

*Not this*:
```js
cy.get('button[type="submit"][form="SearchBar"]')
  .should($button => {
    expect($button).to.not.be.disabled;
    expect($button).to.contain('Search');
    $button.click();
  });
```

*but this:*
```js
cy.get('button[type="submit"][form="SearchBar"]')
  .should('not.be.disabled')
  .and('contain', 'Search')
  .click();
```

