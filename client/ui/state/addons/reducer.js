import { combineReducers } from 'redux';

import {
  ADDON_CREATE,
  ADDON_CREATE_SUCCESS,
  ADDON_CREATE_FAILURE,
  ADDON_RECEIVED,
  ADDON_REQUEST,
  ADDON_REQUEST_SUCCESS,
  ADDON_REQUEST_FAILURE,
  ADDON_UPDATE,
  ADDON_UPDATE_SUCCESS,
  ADDON_UPDATE_FAILURE,
  ADDONS_REQUEST,
  ADDONS_REQUEST_SUCCESS,
  ADDONS_REQUEST_FAILURE,
} from '../action-types';


export function objects(state = {}, action) {
  switch (action.type) {
    case ADDON_RECEIVED:
      return {
        ...state,
        [action.addon.id]: action.addon,
      };

    default:
      return state;
  }
}

export function pagination(state = {}, action) {
  switch (action.type) {
    case ADDONS_REQUEST_SUCCESS:
      return {
        ...state,
        count: action.data.count,
        ids: action.data.results.map(item => item.id),
      };

    default:
      return state;
  }
}

export function requests(state = {}, action) {
  switch (action.type) {
    case ADDON_CREATE:
    case ADDON_REQUEST:
    case ADDON_UPDATE:
    case ADDONS_REQUEST:
      return {
        ...state,
        [action.requestId]: {
          loading: true,
          error: null,
        },
      };

    case ADDON_CREATE_SUCCESS:
    case ADDON_REQUEST_SUCCESS:
    case ADDON_UPDATE_SUCCESS:
    case ADDONS_REQUEST_SUCCESS:
      return {
        ...state,
        [action.requestId]: {
          loading: false,
          error: null,
        },
      };

    case ADDON_CREATE_FAILURE:
    case ADDON_REQUEST_FAILURE:
    case ADDON_UPDATE_FAILURE:
    case ADDONS_REQUEST_FAILURE:
      return {
        ...state,
        [action.requestId]: {
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
}

export default combineReducers({
  objects,
  pagination,
  requests,
});
