import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import addonsReducer from './addonsReducer';


const rootReducer = combineReducers({
  addons: addonsReducer,
  form: formReducer,
  routing: routerReducer,
});

export default rootReducer;
