import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';

import rootReducer from '../reducers';


const enhancer = applyMiddleware(promise);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
};
