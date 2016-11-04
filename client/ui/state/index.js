import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import addons from './addons/reducer';
import addonGroups from './addonGroups/reducer';


const reducer = combineReducers({
  addons,
  addonGroups,
  form,
  routing,
});

export default reducer;
