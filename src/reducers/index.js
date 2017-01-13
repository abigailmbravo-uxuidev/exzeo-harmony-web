/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import auth from './authReducer';
import features from './featureReducer';
import search from './searchReducer';

let uri = 'http://www-demo.harmony-ins.com/api';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:4001/api';
}

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
  auth,
  features,
  search,
  apollo: client.reducer(),
});

export default rootReducer;
