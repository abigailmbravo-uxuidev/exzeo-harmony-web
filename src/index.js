/* globals document */
/* eslint react/jsx-filename-extension:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import axios from 'axios';
import configureStore from './store/configureStore';
import { client } from './reducers';
import AppConnected from './containers/App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './css/typtap-theme.min.css';


console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL);

const auth0 = axios.create({
  baseURL: 'https://harmony.auth0.com/api/v2',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3bEVlckVCazU2YWh2UnhiTERHczFoUnBTcUNTSHNLTyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0ODI5NzE3NzYsImp0aSI6IjQ2NGQ5YWY3NmNjODMxMWJkNWVmNDYzNGZkODc1YmJhIn0.E2Il-xBY0gkQ4WvhcKmldyxUGLPdCXAj-2nN_gwcrmk'
  }
});

auth0({
  url: 'users',
  params: {
    per_page: 10,
    page: 0,
    include_totals: true,
    q: 'identities.connection="Username-Password-Authentication"'
  }
// })
// .then((response) => {
//   console.log(response.data); // eslint-disable-line
// })
// .catch((error) => {
//   console.log(error); // eslint-disable-line
});

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <AppConnected />
  </ApolloProvider>,
  document.getElementById('root'),
);
