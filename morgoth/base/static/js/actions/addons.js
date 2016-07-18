import apiFetch from '../utils/apiFetch';


// Addons list
export const FETCH_ADDONS_REQUEST = 'FETCH_ADDONS_REQUEST';
export const FETCH_ADDONS_SUCCESS = 'FETCH_ADDONS_SUCCESS';
export const FETCH_ADDONS_FAILURE = 'FETCH_ADDONS_FAILURE';
export const RESET_ADDONS = 'RESET_ADDONS';

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
