const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  const ourKeys = ['access_token', 'id_token'];

  Object.keys(localStorage)
    .filter(key => ourKeys.indexOf(key) !== -1)
    .forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY)
    .forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});
