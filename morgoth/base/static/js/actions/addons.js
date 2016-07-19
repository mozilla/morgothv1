import apiFetch from '../utils/apiFetch';


// Addons list
export const FETCH_ADDONS_REQUEST = 'FETCH_ADDONS_REQUEST';
export const FETCH_ADDONS_SUCCESS = 'FETCH_ADDONS_SUCCESS';
export const FETCH_ADDONS_FAILURE = 'FETCH_ADDONS_FAILURE';
export const RESET_ADDONS = 'RESET_ADDONS';

// Fetch a single addon
export const FETCH_ADDON_REQUEST = 'FETCH_ADDON_REQUEST';
export const FETCH_ADDON_SUCCESS = 'FETCH_ADDON_SUCCESS';
export const FETCH_ADDON_FAILURE = 'FETCH_ADDON_FAILURE';
export const RESET_ADDON = 'RESET_ADDON';

function fetchError(type, error) {
  return {
    type,
    error,
  };
}

function requestAddons() {
  return {
    type: FETCH_ADDONS_REQUEST,
  };
}

function receivedAddons(addons) {
  return {
    type: FETCH_ADDONS_SUCCESS,
    addons,
  };
}

function requestAddon(pk) {
  return {
    type: FETCH_ADDON_REQUEST,
    pk,
  };
}

function receivedAddon(addon) {
  return {
    type: FETCH_ADDON_SUCCESS,
    addon,
  };
}

export function fetchAddons() {
  return dispatch => {
    dispatch(requestAddons());

    return apiFetch('addon/', {
      method: 'GET',
      success: receivedAddons,
      error: error => fetchError(FETCH_ADDONS_FAILURE, error),
      dispatch,
    });
  };
}

export function fetchAddon(pk) {
  return dispatch => {
    dispatch(requestAddon(pk));

    return apiFetch(`addon/${pk}/`, {
      method: 'GET',
      success: receivedAddon,
      error: error => fetchError(FETCH_ADDON_FAILURE, error),
      dispatch,
    });
  };
}
