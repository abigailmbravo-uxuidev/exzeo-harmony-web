/* eslint-disable import/first */
// import 'custom-event-polyfill';
import 'react-app-polyfill/ie11';
import 'core-js/fn/array/find';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/keys';
import 'core-js/fn/number/is-nan';

(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import axios from 'axios';
import { retry } from '@exzeo/core-ui';

import configureStore from './store/configureStore';
import Routes from './routes';

import '../node_modules/font-awesome/scss/font-awesome.scss';
import './sass/typtap-theme.scss';

retry(axios);
const store = configureStore();
const persistor = persistStore(store, { storage: asyncSessionStorage });
window.persistor = persistor; // i hate this with my entire being...

const target = document.getElementById('root');
render(
  <Provider store={store} persistor={persistor}><Routes store={store} /></Provider>,
  target
);
