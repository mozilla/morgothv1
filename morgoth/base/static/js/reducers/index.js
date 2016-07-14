import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import addonsReducer from './addonsReducer';


const rootReducer = combineReducers({
  addons: addonsReducer,
  routing: routerReducer,
});

export default rootReducer;
