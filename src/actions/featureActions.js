import ldClient from 'ldclient-js';

// THUNKS
export const initializeLD = () => {
  return dispatch => {
    const user = { key: '123zbc', anonymous: true };
    const client = ldClient.initialize('580fbc42af75f2083091a664', user);
    client.on('ready', () => {
      console.log('Launched Darkly');
    });
    client.on('change', (value, key) => {
      console.log(value, key);
    });
  }
}
