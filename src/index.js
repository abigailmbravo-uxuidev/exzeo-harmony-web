import 'react-app-polyfill/ie11';
import 'core-js/fn/array/find';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/keys';
import 'core-js/fn/number/is-nan';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';

import configureStore from './store/configureStore';
import Routes from './routes';

import '../node_modules/font-awesome/scss/font-awesome.scss';
import './sass/typtap-theme.scss';

const store = configureStore();
const persistor = persistStore(store, { storage: asyncSessionStorage });
window.persistor = persistor; // i hate this with my entire being...

const target = document.getElementById('root');
render(
  <Provider store={store} persistor={persistor}><Routes store={store} /></Provider>,
  target
);
