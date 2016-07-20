import {
  FETCH_ADDONS_REQUEST, FETCH_ADDONS_SUCCESS, FETCH_ADDONS_FAILURE, RESET_ADDONS,
  CREATE_ADDON_REQUEST, CREATE_ADDON_SUCCESS, CREATE_ADDON_FAILURE, RESET_NEW_ADDON,
  FETCH_ADDON_REQUEST, FETCH_ADDON_SUCCESS, FETCH_ADDON_FAILURE, RESET_ADDON,
  UPDATE_ADDON_REQUEST, UPDATE_ADDON_SUCCESS, UPDATE_ADDON_FAILURE, RESET_UPDATE_ADDON,
} from '../actions/addons';


const INITIAL_STATE = {
  list: {
    addons: [],
    error: null,
    loading: false,
  },
  create: {
    addon: null,
    error: null,
    loading: false,
  },
  active: {
    addon: null,
    error: null,
    loading: false,
  },
  update: {
    addon: null,
    error: null,
    loading: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADDONS_REQUEST:
      return {
        ...state,
        list: {
          addons: [],
          error: null,
          loading: true,
        },
      };

    case FETCH_ADDONS_SUCCESS:
      return {
        ...state,
        list: {
          addons: action.addons,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDONS_FAILURE:
      return {
        ...state,
        list: {
          addons: [],
          error: action.error,
          loading: false,
        },
      };

    case RESET_ADDONS:
      return {
        ...state,
        list: {
          addons: [],
          error: null,
          loading: false,
        },
      };

    case CREATE_ADDON_REQUEST:
      return {
        ...state,
        create: {
          addon: null,
          error: null,
          loading: true,
        },
      };

    case CREATE_ADDON_SUCCESS:
      return {
        ...state,
        create: {
          addon: action.addon,
          error: null,
          loading: false,
        },
      };

    case CREATE_ADDON_FAILURE:
      return {
        ...state,
        create: {
          addon: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_NEW_ADDON:
      return {
        ...state,
        create: {
          addon: null,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_REQUEST:
      return {
        ...state,
        active: {
          addon: null,
          error: null,
          loading: true,
        },
      };

    case FETCH_ADDON_SUCCESS:
      return {
        ...state,
        active: {
          addon: action.addon,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_FAILURE:
      return {
        ...state,
        active: {
          addon: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_ADDON:
      return {
        ...state,
        active: {
          addon: null,
          error: null,
          loading: false,
        },
      };

    case UPDATE_ADDON_REQUEST:
      return {
        ...state,
        update: {
          addon: null,
          error: null,
          loading: true,
        },
      };

    case UPDATE_ADDON_SUCCESS:
      return {
        ...state,
        update: {
          addon: action.addon,
          error: null,
          loading: false,
        },
      };

    case UPDATE_ADDON_FAILURE:
      return {
        ...state,
        update: {
          addon: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_UPDATE_ADDON:
      return {
        ...state,
        update: {
          addon: null,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};
