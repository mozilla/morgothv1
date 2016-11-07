import { combineReducers } from 'redux';

import {
  ADDON_GROUP_CREATE,
  ADDON_GROUP_CREATE_SUCCESS,
  ADDON_GROUP_CREATE_FAILURE,
  ADDON_GROUP_RECEIVED,
  ADDON_GROUP_REQUEST,
  ADDON_GROUP_REQUEST_SUCCESS,
  ADDON_GROUP_REQUEST_FAILURE,
  ADDON_GROUP_SYNC,
  ADDON_GROUP_SYNC_SUCCESS,
  ADDON_GROUP_SYNC_FAILURE,
  ADDON_GROUP_UPDATE,
  ADDON_GROUP_UPDATE_SUCCESS,
  ADDON_GROUP_UPDATE_FAILURE,
  ADDON_GROUPS_REQUEST,
  ADDON_GROUPS_REQUEST_SUCCESS,
  ADDON_GROUPS_REQUEST_FAILURE,
} from '../action-types';


export function objects(state = {}, action) {
  switch (action.type) {
    case ADDON_GROUP_RECEIVED:
      return {
        ...state,
        [action.addonGroup.id]: {
          ...action.addonGroup,
          addons: action.addonGroup.addons.map(addon => addon.id),
        },
      };

    default:
      return state;
  }
}

export function pagination(state = {}, action) {
  switch (action.type) {
    case ADDON_GROUPS_REQUEST_SUCCESS:
      const ids = [...state.ids || []];

      while (ids.length < action.data.count) {
        ids.push(null);
      }

      for (let i = 0; i < action.data.results.length; i += 1) {
        ids[i + action.offset] = action.data.results[i].id;
      }

      return {
        ...state,
        count: action.data.count,
        ids,
      };

    default:
      return state;
  }
}

export function requests(state = {}, action) {
  switch (action.type) {
    case ADDON_GROUP_CREATE:
    case ADDON_GROUP_REQUEST:
    case ADDON_GROUP_SYNC:
    case ADDON_GROUP_UPDATE:
    case ADDON_GROUPS_REQUEST:
      return {
        ...state,
        [action.requestId]: {
          loading: true,
          error: null,
        },
      };

    case ADDON_GROUP_CREATE_SUCCESS:
    case ADDON_GROUP_REQUEST_SUCCESS:
    case ADDON_GROUP_SYNC_SUCCESS:
    case ADDON_GROUP_UPDATE_SUCCESS:
    case ADDON_GROUPS_REQUEST_SUCCESS:
      return {
        ...state,
        [action.requestId]: {
          loading: false,
          error: null,
        },
      };

    case ADDON_GROUP_CREATE_FAILURE:
    case ADDON_GROUP_REQUEST_FAILURE:
    case ADDON_GROUP_SYNC_FAILURE:
    case ADDON_GROUP_UPDATE_FAILURE:
    case ADDON_GROUPS_REQUEST_FAILURE:
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
