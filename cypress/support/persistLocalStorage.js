// // This file is to persist and rehydrate local storage.
// // Add/remove keys from ourKeys as necessary to bypass Cypress's local storage clear.

// const LOCAL_STORAGE_MEMORY = {};

// Cypress.Commands.add('saveLocalStorage', () => {
//   const ourKeys = ['access_token', 'id_token'];
//   cy.log(localStorage)
//   Object.keys(localStorage)
//     .filter(key => ourKeys.includes(key))
//     .forEach(key => {
//       LOCAL_STORAGE_MEMORY[key] = localStorage[key];
//     });
// });

// Cypress.Commands.add('restoreLocalStorage', () => {
//   Object.keys(LOCAL_STORAGE_MEMORY)
//     .forEach(key => {
//       localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
//     });
// });

import { AUTH_TOKENS } from './constants';

Cypress.Commands.add('persistSession', (keys) =>
  cy.wrap(keys).each(key => {
    const value = localStorage.getItem(key);
    cy.setCookie(key, value);
  })
);

Cypress.Commands.add('restoreSession', (keys) =>
  cy.wrap(keys).each(key =>
    cy.getCookie(key).then(cookie => {
      if (cookie && cookie.value) { localStorage.setItem(key, cookie.value); }
    })
  )
);

Cypress.Cookies.defaults({
  whitelist: AUTH_TOKENS
});
