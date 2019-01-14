# Cypress

## This is the README for testing harmony-web via Cypress
### If you only want the docker container - for CI purposes, e.g. - scroll [here](#Docker-Readme).

This document assumes you have already read the README for Harmony 
[here](https://bitbucket.org/exzeo-usa/harmony-web/src/master/) and followed all steps listed there.

Run `npm run cypress` to test with the test runner,
or `npm run cypress -- --headless` to run in headless mode.

## Builds

### Local
To run it locally, just run the app locally: `npm run start`. Cypress will default to testing here when running `npm run cypress`
or `npm run cypress -- --headless.`

### HIT
To run using HIT, first follow the HIT directions
[here](https://issuecenter.atlassian.net/wiki/spaces/SDLC/pages/577634574/Running+HIT).


---

### Docker Readme


---

### Writing New Tests

Take a look at the [Cypress Docs](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file). Cypress uses [Chai Assertions](https://www.chaijs.com/api/bdd/). Be sure to read the [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html).

The organization of the tests should be 
```
cypress/
  integration/
    ui/
      -pure ui testing
    actions/
      -actions in the application which will generally move you between routes
```

The extension is `.spec.js`.

Each test should contain one - and only one - describe statement at the top. Most
of your tests should also include as few `it()` calls as possible, as Cypress
clears `localStorage`, `cookies`, sessions, etc before each test. For example,
don't do this:
```
describe('the searchAddress page', () => {
  it('Has the phone number', () => {
    cy.get('a.link-phone.btn').should('contain', '844-289-7968');
  });

  it('Has a disabled button', () => {
    cy.get('button[type="submit"][form="SearchBar"]').should('be.disabled');
  });

  it('Has a button which activates when form is filled out', ()=> {
    cy.get('input[name=address]').type('4131 TEST ADDRESS');

    cy.get('button[type="submit"][form="SearchBar"]').should('not.be.disabled');
  });
});
```
do this:
```
describe('the searchAddress page', () => {
  it('Submit button is searchable', () => {
      cy.get('a.link-phone.btn').should('contain', '844-289-7968');

      cy.get('button[type="submit"][form="SearchBar"]').should('be.disabled');
      cy.get('input[name=address]').type('4131 TEST ADDRESS');

      cy.get('button[type="submit"][form="SearchBar"]')
        .should('not.be.disabled')
  });
});
```
Also favor dot notation over callback notation. Not this:
```
cy.get('button[type="submit"][form="SearchBar"]')
  .should(button => {
    expect(button).to.not.be.disabled;
    expect(button).to.contain('Search');
    button.click();
  });
```

but this:

```
cy.get('button[type="submit"][form="SearchBar"]')
  .should('not.be.disabled')
  .and('contain', 'Search')
  .click();
```

Finally, if you do use multiple `it()`s in one test, make sure the next test does
not rely on the previous test -- if they do, they should be one test. This WILL
cause your tests to fail, but not 100% of the time. It's pretty awful and you will
curse the kobolds infesting your code. So don't do this:
```
describe('my form', function () {
  it('visits the form', function () {
    cy.visit('/users/new')
  })

  it('requires first name', function () {
    cy.get('#first').type('Johnny')
  })

  it('requires last name', function () {
    cy.get('#last').type('Appleseed')
  })

  it('can submit a valid form', function () {
    cy.get('form').submit()
  })
})
```
but do this:
```
describe('my form', function () {
  beforeEach(function () {
    cy.visit('/users/new')
    cy.get('#first').type('Johnny')
    cy.get('#last').type('Appleseed')
  })

  it('displays form validation', function () {
    cy.get('#first').clear() // clear out first name
    cy.get('form').submit()
    cy.get('#errors').should('contain', 'First name is required')
  })

  it('can submit a valid form', function () {
    cy.get('form').submit()
  })
})
```
This example is pulled directly from the Cypress docs [here](https://docs.cypress.io/guides/references/best-practices.html#Having-tests-rely-on-the-state-of-previous-tests).