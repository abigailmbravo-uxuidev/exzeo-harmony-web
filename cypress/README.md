# Cypress

## Getting started

This assumes you already have harmony-web
[configured](https://bitbucket.org/exzeo-usa/harmony-web/src/master/).

By default, Cypress is configured to run against a local instance of Harmony-Web running on your computer.
To change this behavior and point to a different environment, see below.

Confirm that the following ENV variable is in `.env.local`
```bash
# point cypress to a different environment
#CYPRESS_BASE_URL=https://agency.harmony-ins.com
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

To navigate to a page inside of the app, use the navigation helpers.
This should be written in your `before()` hook and will
most likely be utilized on every test.

Whenever possible, use a reusable function listed in `support/inputs` or 
`support/utils`. This should cover the majority of test cases. **Favor `findDataTag()` 
over `get()`**. If you have to `get()` frequently, consider adding data-test tags into 
the harmony-web code itself. **When adding data-test tags, use dashes.**

When creating a test, place any reusable functions at the top, inside the describe.
For example, if you are always typing on the same inputs, this is a good place
to create a reusable call.

When using fixtures, if they are used more than once in the suite, alias them in the
`beforeEach()` call using `cy.fixture().as()`. If you do, your `it()` statements
which utilize these fixtures must use the `function()` notation rather than arrow 
notation. In all other cases  - including `before` and `beforeEach`, even when aliasing 
- use arrow notation.

If you want to update a fixture, most of the time you will use the cy.setFx()
function detailed in `support/stubbing.js`. After using this function you will need to wrap
the remainder of your test in a `then()` call like so:
```js
cy.setFx('/stubs/foo/bar', ['res.keyToChange', 'newValueString']).then(() =>
  cy.findDataTag('foo') //etc etc
);
```

Favor dot notation over callback notation. Only use `then` calls if necessary. A good
place for then calls is when waiting on async calls, such as either a network request
or getting a fixture from `cy/fixtures`. Also avoid these `then` calls because they expost the
element as a jQuery element, without the Cypress wrapper, requiring using the jQuery assertions.

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