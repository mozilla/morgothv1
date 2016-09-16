import {
  FETCH_ADDON_GROUPS_REQUEST, FETCH_ADDON_GROUPS_SUCCESS, FETCH_ADDON_GROUPS_FAILURE,
  RESET_ADDON_GROUPS, CREATE_ADDON_GROUP_REQUEST, CREATE_ADDON_GROUP_SUCCESS,
  CREATE_ADDON_GROUP_FAILURE, RESET_NEW_ADDON_GROUP, FETCH_ADDON_GROUP_REQUEST,
  FETCH_ADDON_GROUP_SUCCESS, FETCH_ADDON_GROUP_FAILURE, RESET_ADDON_GROUP,
  UPDATE_ADDON_GROUP_REQUEST, UPDATE_ADDON_GROUP_SUCCESS, UPDATE_ADDON_GROUP_FAILURE,
  RESET_UPDATE_ADDON_GROUP, SYNC_ADDON_GROUP_REQUEST, SYNC_ADDON_GROUP_SUCCESS,
  SYNC_ADDON_GROUP_FAILURE,
} from '../actions/addon-groups';


const INITIAL_STATE = {
  list: {
    addonGroups: [],
    error: null,
    loading: false,
  },
  create: {
    addonGroup: null,
    error: null,
    loading: false,
  },
  active: {
    addonGroup: null,
    error: null,
    loading: false,
  },
  update: {
    addonGroup: null,
    error: null,
    loading: false,
  },
  sync: {
    synced: false,
    error: null,
    loading: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADDON_GROUPS_REQUEST:
      return {
        ...state,
        list: {
          addonGroups: [],
          error: null,
          loading: true,
        },
      };

    case FETCH_ADDON_GROUPS_SUCCESS:
      return {
        ...state,
        list: {
          addonGroups: action.addonGroups,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_GROUPS_FAILURE:
      return {
        ...state,
        list: {
          addonGroups: [],
          error: action.error,
          loading: false,
        },
      };

    case RESET_ADDON_GROUPS:
      return {
        ...state,
        list: {
          addonGroups: [],
          error: null,
          loading: false,
        },
      };

    case CREATE_ADDON_GROUP_REQUEST:
      return {
        ...state,
        create: {
          addonGroup: null,
          error: null,
          loading: true,
        },
      };

    case CREATE_ADDON_GROUP_SUCCESS:
      return {
        ...state,
        create: {
          addonGroup: action.addonGroup,
          error: null,
          loading: false,
        },
      };

    case CREATE_ADDON_GROUP_FAILURE:
      return {
        ...state,
        create: {
          addonGroup: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_NEW_ADDON_GROUP:
      return {
        ...state,
        create: {
          addonGroup: null,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_GROUP_REQUEST:
      return {
        ...state,
        active: {
          addonGroup: null,
          error: null,
          loading: true,
        },
      };

    case FETCH_ADDON_GROUP_SUCCESS:
      return {
        ...state,
        active: {
          addonGroup: action.addonGroup,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_GROUP_FAILURE:
      return {
        ...state,
        active: {
          addonGroup: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_ADDON_GROUP:
      return {
        ...state,
        active: {
          addonGroup: null,
          error: null,
          loading: false,
        },
      };

    case UPDATE_ADDON_GROUP_REQUEST:
      return {
        ...state,
        update: {
          addonGroup: null,
          error: null,
          loading: true,
        },
      };

    case UPDATE_ADDON_GROUP_SUCCESS:
      return {
        ...state,
        update: {
          addonGroup: action.addonGroup,
          error: null,
          loading: false,
        },
      };

    case UPDATE_ADDON_GROUP_FAILURE:
      return {
        ...state,
        update: {
          addonGroup: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_UPDATE_ADDON_GROUP:
      return {
        ...state,
        update: {
          addonGroup: null,
          error: null,
          loading: false,
        },
      };

    case SYNC_ADDON_GROUP_REQUEST:
      return {
        ...state,
        sync: {
          synced: false,
          error: null,
          loading: true,
        },
      };

    case SYNC_ADDON_GROUP_SUCCESS:
      return {
        ...state,
        sync: {
          synced: true,
          error: null,
          loading: false,
        },
      };

    case SYNC_ADDON_GROUP_FAILURE:
      return {
        ...state,
        sync: {
          synced: false,
          error: action.error,
          loading: false,
        },
      };

    default:
      return state;
  }
};
