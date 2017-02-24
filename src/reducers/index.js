/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApolloClient, { createNetworkInterface, createBatchingNetworkInterface } from 'apollo-client';
import localStorage from 'localStorage';
import auth from './authReducer';
import features from './featureReducer';
import search from './searchReducer';
import details from './detailsReducer';


let uri = `${(process.env.REACT_APP_API_URL || 'http://localhost:4001')}/api`;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:4001/api';
}

// const networkInterface = createNetworkInterface({ uri });
const batchingNetworkInterface = createBatchingNetworkInterface({
  uri,
  batchInterval: 10,
});

batchingNetworkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = localStorage.getItem('token');
    req.options.headers.authorization = token;
    next();
  },
}]);

export const client = new ApolloClient({
  networkInterface: batchingNetworkInterface,
  queryDeduplication: true,
});

const rootReducer = combineReducers({
  form: formReducer,
  details,
  auth,
  features,
  search,
  apollo: client.reducer(),
});

export default rootReducer;
