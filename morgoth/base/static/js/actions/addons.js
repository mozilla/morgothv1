// Addons list
export const FETCH_ADDONS_REQUEST = 'FETCH_ADDONS_REQUEST';
export const FETCH_ADDONS_SUCCESS = 'FETCH_ADDONS_SUCCESS';
export const FETCH_ADDONS_FAILURE = 'FETCH_ADDONS_FAILURE';
export const RESET_ADDONS = 'RESET_ADDONS';

const API_ROOT = '/api/v1/';

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

    const settings = {
      method: 'GET',
      headers: new Headers(),
    };

    return fetch(`${API_ROOT}addon/`, settings)
      .then(response => response.json())
      .then(data => dispatch(receivedAddons(data)))
      .catch(error => dispatch(fetchError(FETCH_ADDONS_FAILURE, { message: error.message })));
  };
}
