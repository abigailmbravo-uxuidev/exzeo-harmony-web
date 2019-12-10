/* eslint-disable import/first */
// Copied from stackoverflow - there are some obvious simplifications possible, but leaving it alone
// https://stackoverflow.com/questions/49328382/browser-detection-in-reactjs

// Safari 3.0+ "[object HTMLElementConstructor]"
const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function(p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(
    !window['safari'] ||
      (typeof window['safari'] !== 'undefined' &&
        window['safari'].pushNotification)
  );
// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;
window.harmony_web_use_fallback = isIE || isSafari;

import 'react-app-polyfill/ie11';
import 'core-js/fn/array/find';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/entries';
import 'core-js/fn/number/is-nan';
import 'core-js/fn/object/values';
import 'core-js/fn/string/repeat';
import 'core-js/fn/symbol/iterator.js';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { BrowserRouter as Router } from 'react-router-dom';
import { asyncSessionStorage } from 'redux-persist/storages';
import { http as axios, retry } from '@exzeo/core-ui';

import configureStore from './store/configureStore';
import Authentication from './components/Authentication';
import Routes from './routes';

import '../node_modules/font-awesome/scss/font-awesome.scss';
import './sass/typtap-theme.scss';

const AUTH_CONFIG = {
  publicPaths: [
    '/login',
    '/logout',
    '/accessDenied',
    '/loggedOut',
    '/callback'
  ],
  profileLocation: 'user_profile',
  tokenLocation: 'id_token',
  unauthRedirect: '/login'
};

retry(axios);
const store = configureStore();
const persistor = persistStore(store, { storage: asyncSessionStorage });
window.persistor = persistor; // i hate this with my entire being...

const target = document.getElementById('root');
render(
  <Router>
    <Provider store={store}>
      <Authentication
        config={AUTH_CONFIG}
        render={({ auth }) => <Routes auth={auth} />}
      />
    </Provider>
  </Router>,
  target
);
