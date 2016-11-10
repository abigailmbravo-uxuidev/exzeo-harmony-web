import { combineReducers } from 'redux';
import ApolloClient from 'apollo-client';
import features from './featureReducer';

export const client = new ApolloClient();

const rootReducer = combineReducers({
  features,
  apollo: client.reducer(),
});

export default rootReducer;
