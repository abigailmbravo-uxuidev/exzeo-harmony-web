import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { persistStore } from 'redux-persist';

import configureStore from '../state/store/configureStore';
import { Auth0Provider } from './auth-context';
import { asyncSessionStorage } from 'redux-persist/storages';
import { UserProvider } from './user-context';

const store = configureStore();
const persistor = persistStore(store, { storage: asyncSessionStorage });
window.persistor = persistor; // i hate this with my entire being...

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState, history) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

function AppProviders({ children }) {
  return (
    <Router>
      <Provider store={store}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirect_uri={`${process.env.REACT_APP_AUTH0_PRIMARY_URL}`}
          onRedirectCallback={onRedirectCallback}
        >
          <UserProvider>{children}</UserProvider>
        </Auth0Provider>
      </Provider>
    </Router>
  );
}

export default AppProviders;
