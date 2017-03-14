/* eslint no-param-reassign:0 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import localStorage from 'localStorage';
import auth from './authReducer';
import features from './featureReducer';
import search from './searchReducer';
import details from './detailsReducer';


const uri = `${(process.env.REACT_APP_API_URL || 'http://localhost:4001')}/api`;

const batchingNetworkInterface = createBatchingNetworkInterface({
  uri,
  batchInterval: 10
});

batchingNetworkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = localStorage.getItem('token');
    req.options.headers.authorization = token;
    next();
  }
}]);

export const client = new ApolloClient({
  networkInterface: batchingNetworkInterface,
  queryDeduplication: true
});

const rootReducer = combineReducers({
  form: formReducer,
  details,
  auth,
  features,
  search,
  apollo: client.reducer()
});

export default rootReducer;
