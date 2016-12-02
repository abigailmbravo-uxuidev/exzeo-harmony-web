import ldClient from 'ldclient-js';
import * as types from './actionTypes';

let client;

export const initializeLDSuccess = () => ({
  type: types.INITIALIZELD,
});

export const toggleFeature = feature => ({
  type: types.TOGGLE_FEATURE,
  feature,
});

// THUNKS
export const setupFeature = featureName => (dispatch) => {
  const toggleState = client.variation(featureName, true);
  dispatch(toggleFeature({ featureName, value: toggleState }));
  client.on(`change:${featureName}`, (value) => {
    dispatch(toggleFeature({ featureName, value }));
  });
};

export const initializeLD = () => (dispatch) => {
  const user = { key: '123zbc', anonymous: true };
  const newClient = ldClient.initialize('580fbc42af75f2083091a664', user);
  newClient.on('ready', () => {
    client = newClient;
    dispatch(initializeLDSuccess());
  });
};
