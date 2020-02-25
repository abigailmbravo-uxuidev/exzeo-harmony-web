export function retrieveQuote(quoteNumber, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.quote.retrieveQuote',
      data: {
        quoteNumber
      }
    }
  });
}

export function getToken() {
  return cy.request({
    url: 'https://ashton-sandbox.auth0.com/oauth/token',
    method: 'POST',
    body: {
      grant_type: 'password',
      username: 'tticcsr',
      password: 'Password1',
      audience: '_aVZ55R37kcyZ3NtQcps0bwZ09YYdPLd',
      client_id: '_aVZ55R37kcyZ3NtQcps0bwZ09YYdPLd',
      scope: 'openid email profile name username groups roles',
      client_secret:
        'QWQPGFl2lLybwj9Rhs2cGN_szElzI3W0KOEg4Dw2G7vosuEBvZw265QjIdQgY6Ft'
    }
  });
}

// Total retry time limit ~2 min
const WAIT_TIME_MS = 2000;
const RETRY_MAX = 60;

export function envelopeIdCheck(quoteNumber, apiUrl, token, attemptNumber = 0) {
  // Custom functions should return a 'cy chain' to be able to enforce order of ops
  return retrieveQuote(quoteNumber, apiUrl, token).then(res => {
    if (res.status === 200 && res.body.result.envelopeId) {
      // must wrap a var to make it chainable
      return cy.wrap(res);
    }

    assert.isBelow(
      attemptNumber,
      RETRY_MAX,
      "Number of retries to 'retrieveQuote' waiting for envelopeId to exist on quote"
    );
    cy.wait(WAIT_TIME_MS);
    envelopeIdCheck(quoteNumber, apiUrl, token, attemptNumber + 1);
  });
}

export function manualBindPolicy(quoteNumber, apiUrl, token) {
  return cy.request({
    url: apiUrl,
    method: 'POST',
    auth: { bearer: `${token}` },
    body: {
      exchangeName: 'harmony',
      routingKey: 'harmony.policy.bindPolicy',
      data: {
        quoteId: quoteNumber,
        force: true
      }
    }
  });
}
