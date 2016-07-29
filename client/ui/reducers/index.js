import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import addonsReducer from './addonsReducer';
import addonGroupsReducer from './addonGroupsReducer';


const rootReducer = combineReducers({
  addons: addonsReducer,
  addonGroups: addonGroupsReducer,
  form: formReducer,
  routing: routerReducer,
});

export default rootReducer;
