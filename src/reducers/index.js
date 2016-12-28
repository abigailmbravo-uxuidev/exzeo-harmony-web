/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import features from './featureReducer';
import auth from './authReducer';

let uri = '/api';
console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
console.log(process.env.NODE_ENV);
console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
if (process.env.NODE_ENV === 'runBoth') {
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
  apollo: client.reducer(),
});

export default rootReducer;
