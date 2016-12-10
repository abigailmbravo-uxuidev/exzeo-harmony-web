/* globals document */
/* eslint react/jsx-filename-extension:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import configureStore from './store/configureStore';
import { client } from './reducers';
import AppConnected from './components/App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './css/typtap-theme.min.css';

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <BrowserRouter>
      <AppConnected />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
