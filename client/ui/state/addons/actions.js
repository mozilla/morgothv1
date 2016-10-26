import { push } from 'react-router-redux';

import { getRequest } from './selectors';

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

import apiFetch from '../../utils/apiFetch';


function requestAddonSuccess(dispatch, requestId, addon) {
  dispatch({
    type: ADDON_REQUEST_SUCCESS,
    requestId,
  });

  dispatch({
    type: ADDON_RECEIVED,
    addon,
  });
}

function requestAddonFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_REQUEST_FAILURE,
    requestId,
    error,
  });
}

export function requestAddon(pk) {
  return (dispatch, getState) => {
    const requestId = `addon-${pk}`;
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_REQUEST,
      requestId,
    });

    return apiFetch(`addon/${pk}/`, { method: 'GET' })
      .then(addon => requestAddonSuccess(dispatch, requestId, addon))
      .catch(error => requestAddonFailure(dispatch, requestId, error));
  };
}

function requestAddonsSuccess(dispatch, requestId, data, limit, offset) {
  data.results.forEach(addon => {
    dispatch({
      type: ADDON_RECEIVED,
      addon,
    });
  });

  dispatch({
    type: ADDONS_REQUEST_SUCCESS,
    requestId,
    data,
    limit,
    offset,
  });
}

function requestAddonsFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDONS_REQUEST_FAILURE,
    requestId,
    error,
  });
}

export function requestAddons(limit = 20, offset = 0) {
  return (dispatch, getState) => {
    const requestId = 'addons';
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDONS_REQUEST,
      requestId,
    });

    return apiFetch(`addon/?limit=${limit}&offset=${offset}`, { method: 'GET' })
      .then(data => requestAddonsSuccess(dispatch, requestId, data, limit, offset))
      .catch(error => requestAddonsFailure(dispatch, requestId, error));
  };
}

function createAddonSuccess(dispatch, requestId, addon, saveAndContinue) {
  dispatch({
    type: ADDON_CREATE_SUCCESS,
    requestId,
  });

  dispatch({
    type: ADDON_RECEIVED,
    addon,
  });

  if (saveAndContinue) {
    dispatch(push(`/addons/${addon.id}/`));
  } else {
    dispatch(push('/addons/'));
  }
}

function createAddonFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_CREATE_FAILURE,
    requestId,
    error,
  });
}

export function createAddon(addonData, saveAndContinue) {
  return (dispatch, getState) => {
    const requestId = 'create';
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_CREATE,
      requestId,
    });

    return apiFetch('addon/', { method: 'POST', data: addonData })
      .then(addon => createAddonSuccess(dispatch, requestId, addon, saveAndContinue))
      .catch(error => createAddonFailure(dispatch, requestId, error));
  };
}

function updateAddonSuccess(dispatch, requestId, addon, saveAndContinue) {
  dispatch({
    type: ADDON_UPDATE_SUCCESS,
    requestId,
  });

  dispatch({
    type: ADDON_RECEIVED,
    addon,
  });

  if (!saveAndContinue) {
    dispatch(push('/addons/'));
  }
}

function updateAddonFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_UPDATE_FAILURE,
    requestId,
    error,
  });
}

export function updateAddon(pk, addonData, saveAndContinue) {
  return (dispatch, getState) => {
    const requestId = `update-${pk}`;
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_UPDATE,
      requestId,
    });

    return apiFetch(`addon/${pk}/`, { method: 'PATCH', data: addonData })
      .then(addon => updateAddonSuccess(dispatch, requestId, addon, saveAndContinue))
      .catch(error => updateAddonFailure(dispatch, requestId, error));
  };
}
