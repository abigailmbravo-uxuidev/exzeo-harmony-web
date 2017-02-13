/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import localStorage from 'localStorage';
import auth from './authReducer';
import features from './featureReducer';
import search from './searchReducer';

let uri = `${(process.env.REACT_APP_API_URL || 'http://localhost:4001')}/api`;
console.log(process.env.NODE_ENV);

const networkInterface = createNetworkInterface({ uri });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = localStorage.getItem('token');
    req.options.headers.authorization = token;
    next();
  },
}]);

export const client = new ApolloClient({ networkInterface });

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  features,
  search,
  apollo: client.reducer(),
});

export default rootReducer;
