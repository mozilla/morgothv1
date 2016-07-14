import axios from 'axios';


// Addons list
export const FETCH_ADDONS = 'FETCH_ADDONS';
export const FETCH_ADDONS_SUCCESS = 'FETCH_ADDONS_SUCCESS';
export const FETCH_ADDONS_FAILURE = 'FETCH_ADDONS_FAILURE';
export const RESET_ADDONS = 'RESET_ADDONS';

const API_ROOT = '/api/v1/';

export function fetchAddons() {
  const request = axios({
    method: 'GET',
    url: `${API_ROOT}addon/`,
    headers: [],
  });

  return {
    type: FETCH_ADDONS,
    payload: request,
  };
}

export function fetchAddonsSuccess(addons) {
  return {
    type: FETCH_ADDONS_SUCCESS,
    payload: addons,
  };
}

export function fetchAddonsFailure(error) {
  return {
    type: FETCH_ADDONS_FAILURE,
    payload: error,
  };
}
