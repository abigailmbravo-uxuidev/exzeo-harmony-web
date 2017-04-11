import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { enableBatching } from 'redux-batched-actions';
import rootReducer, { client } from './../reducers';

const middleware = [thunk, client.middleware()];

export default function configureStore(initialState) {
  return createStore(
    enableBatching(rootReducer),
    initialState,
    compose(
      applyMiddleware(...middleware),
      autoRehydrate({
        log: true
      })
    )
  );
}
