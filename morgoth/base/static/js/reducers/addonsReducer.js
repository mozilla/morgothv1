import {
  FETCH_ADDONS_REQUEST, FETCH_ADDONS_SUCCESS, FETCH_ADDONS_FAILURE, RESET_ADDONS,
  FETCH_ADDON_REQUEST, FETCH_ADDON_SUCCESS, FETCH_ADDON_FAILURE, RESET_ADDON,
} from '../actions/addons';


const INITIAL_STATE = {
  addonsList: {
    addons: [],
    error: null,
    loading: false,
  },
  activeAddon: {
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
        addonsList: {
          addons: [],
          error: null,
          loading: true,
        },
      };

    case FETCH_ADDONS_SUCCESS:
      return {
        ...state,
        addonsList: {
          addons: action.addons,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDONS_FAILURE:
      return {
        ...state,
        addonsList: {
          addons: [],
          error: action.error,
          loading: false,
        },
      };

    case RESET_ADDONS:
      return {
        ...state,
        addonsList: {
          addons: [],
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_REQUEST:
      return {
        ...state,
        activeAddon: {
          addon: null,
          error: null,
          loading: true,
        },
      };

    case FETCH_ADDON_SUCCESS:
      return {
        ...state,
        activeAddon: {
          addon: action.addon,
          error: null,
          loading: false,
        },
      };

    case FETCH_ADDON_FAILURE:
      return {
        ...state,
        activeAddon: {
          addon: null,
          error: action.error,
          loading: false,
        },
      };

    case RESET_ADDON:
      return {
        ...state,
        activeAddon: {
          addon: null,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};
