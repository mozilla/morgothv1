import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import addons from './addons/reducer';


const reducer = combineReducers({
  addons,
  form,
  routing,
});

export default reducer;
