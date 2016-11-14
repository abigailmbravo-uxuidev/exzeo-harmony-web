import { combineReducers } from 'redux';
import ApolloClient from 'apollo-client';
import features from './featureReducer';
import auth from './authReducer';

export const client = new ApolloClient();

const rootReducer = combineReducers({
  features,
  auth,
  apollo: client.reducer(),
});

export default rootReducer;
