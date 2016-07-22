import { browserHistory } from 'react-router';

import apiFetch from '../utils/apiFetch';


// Addons list
export const FETCH_ADDONS_REQUEST = 'FETCH_ADDONS_REQUEST';
export const FETCH_ADDONS_SUCCESS = 'FETCH_ADDONS_SUCCESS';
export const FETCH_ADDONS_FAILURE = 'FETCH_ADDONS_FAILURE';
export const RESET_ADDONS = 'RESET_ADDONS';

// Create an addon
export const CREATE_ADDON_REQUEST = 'CREATE_ADDON_REQUEST';
export const CREATE_ADDON_SUCCESS = 'CREATE_ADDON_SUCCESS';
export const CREATE_ADDON_FAILURE = 'CREATE_ADDON_FAILURE';
export const RESET_NEW_ADDON = 'RESET_NEW_ADDON';

// Fetch a single addon
export const FETCH_ADDON_REQUEST = 'FETCH_ADDON_REQUEST';
export const FETCH_ADDON_SUCCESS = 'FETCH_ADDON_SUCCESS';
export const FETCH_ADDON_FAILURE = 'FETCH_ADDON_FAILURE';
export const RESET_ADDON = 'RESET_ADDON';

// Update an addon
export const UPDATE_ADDON_REQUEST = 'UPDATE_ADDON_REQUEST';
export const UPDATE_ADDON_SUCCESS = 'UPDATE_ADDON_SUCCESS';
export const UPDATE_ADDON_FAILURE = 'UPDATE_ADDON_FAILURE';
export const RESET_UPDATE_ADDON = 'RESET_UPDATE_ADDON';


function apiError(type, error) {
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

function requestCreateAddon() {
  return {
    type: CREATE_ADDON_REQUEST,
  };
}

function receivedCreateAddon(addon, saveAndContinue) {
  if (saveAndContinue) {
    browserHistory.push(`/addons/${addon.id}/`);
  } else {
    browserHistory.push('/addons/');
  }

  return {
    type: CREATE_ADDON_SUCCESS,
    addon,
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

function requestUpdateAddon() {
  return {
    type: UPDATE_ADDON_REQUEST,
  };
}

function receivedUpdateAddon(addon, saveAndContinue) {
  if (!saveAndContinue) {
    browserHistory.push('/addons/');
  }

  return {
    type: UPDATE_ADDON_SUCCESS,
    addon,
  };
}

export function fetchAddons() {
  return dispatch => {
    dispatch(requestAddons());

    return apiFetch('addon/', {
      method: 'GET',
      success: receivedAddons,
      error: error => apiError(FETCH_ADDONS_FAILURE, error),
      dispatch,
    });
  };
}

export function createAddon(data, saveAndContinue) {
  return dispatch => {
    dispatch(requestCreateAddon());

    return apiFetch('addon/', {
      method: 'POST',
      data,
      success: addon => receivedCreateAddon(addon, saveAndContinue),
      error: error => apiError(CREATE_ADDON_FAILURE, error),
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
      error: error => apiError(FETCH_ADDON_FAILURE, error),
      dispatch,
    });
  };
}

export function updateAddon(pk, data, saveAndContinue) {
  return dispatch => {
    dispatch(requestUpdateAddon());

    return apiFetch(`addon/${pk}/`, {
      method: 'PATCH',
      data,
      success: addon => receivedUpdateAddon(addon, saveAndContinue),
      error: error => apiError(UPDATE_ADDON_FAILURE, error),
      dispatch,
    });
  };
}
