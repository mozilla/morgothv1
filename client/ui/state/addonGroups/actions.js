import { push } from 'react-router-redux';

import { getRequest } from './selectors';

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
  ADDON_RECEIVED,
} from '../action-types';

import apiFetch from '../../utils/apiFetch';


function requestAddonGroupSuccess(dispatch, requestId, addonGroup) {
  dispatch({
    type: ADDON_GROUP_REQUEST_SUCCESS,
    requestId,
  });

  addonGroup.addons.forEach(addon => {
    dispatch({
      type: ADDON_RECEIVED,
      addon,
    });
  });

  dispatch({
    type: ADDON_GROUP_RECEIVED,
    addonGroup,
  });
}

function requestAddonGroupFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_GROUP_REQUEST_FAILURE,
    requestId,
    error,
  });
}

export function requestAddonGroup(pk) {
  return (dispatch, getState) => {
    const requestId = `addon-group-${pk}`;
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_GROUP_REQUEST,
      requestId,
    });

    return apiFetch(`addon_group/${pk}/`, { method: 'GET' })
      .then(addonGroup => requestAddonGroupSuccess(dispatch, requestId, addonGroup))
      .catch(error => requestAddonGroupFailure(dispatch, requestId, error));
  };
}

function requestAddonGroupsSuccess(dispatch, requestId, data, limit, offset) {
  data.results.forEach(addonGroup => {
    addonGroup.addons.forEach(addon => {
      dispatch({
        type: ADDON_RECEIVED,
        addon,
      });
    });

    dispatch({
      type: ADDON_GROUP_RECEIVED,
      addonGroup,
    });
  });

  dispatch({
    type: ADDON_GROUPS_REQUEST_SUCCESS,
    requestId,
    data,
    limit,
    offset,
  });
}

function requestAddonGroupsFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_GROUPS_REQUEST_FAILURE,
    requestId,
    error,
  });
}

export function requestAddonGroups(limit = 20, offset = 0) {
  return (dispatch, getState) => {
    const requestId = 'addon-groups';
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_GROUPS_REQUEST,
      requestId,
    });

    return apiFetch(`addon_group/?limit=${limit}&offset=${offset}`, { method: 'GET' })
      .then(data => requestAddonGroupsSuccess(dispatch, requestId, data, limit, offset))
      .catch(error => requestAddonGroupsFailure(dispatch, requestId, error));
  };
}

function createAddonGroupSuccess(dispatch, requestId, addonGroup, saveAndContinue) {
  dispatch({
    type: ADDON_GROUP_CREATE_SUCCESS,
    requestId,
  });

  dispatch({
    type: ADDON_GROUP_RECEIVED,
    addonGroup,
  });

  if (saveAndContinue) {
    dispatch(push(`/addon_groups/${addonGroup.id}/`));
  } else {
    dispatch(push('/addon_groups/'));
  }
}

function createAddonGroupFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_GROUP_CREATE_FAILURE,
    requestId,
    error,
  });
}

export function createAddonGroup(addonData, saveAndContinue) {
  return (dispatch, getState) => {
    const requestId = 'create';
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_GROUP_CREATE,
      requestId,
    });

    return apiFetch('addon_group/', { method: 'POST', data: addonData })
      .then(addonGroup => (
        createAddonGroupSuccess(dispatch, requestId, addonGroup, saveAndContinue)
      ))
      .catch(error => createAddonGroupFailure(dispatch, requestId, error));
  };
}

function updateAddonGroupSuccess(dispatch, requestId, addonGroup, saveAndContinue) {
  dispatch({
    type: ADDON_GROUP_UPDATE_SUCCESS,
    requestId,
  });

  dispatch({
    type: ADDON_GROUP_RECEIVED,
    addonGroup,
  });

  if (!saveAndContinue) {
    dispatch(push('/addon_groups/'));
  }
}

function updateAddonGroupFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_GROUP_UPDATE_FAILURE,
    requestId,
    error,
  });
}

export function updateAddonGroup(pk, addonGroupData, saveAndContinue) {
  return (dispatch, getState) => {
    const requestId = `update-${pk}`;
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_GROUP_UPDATE,
      requestId,
    });

    return apiFetch(`addon_group/${pk}/`, { method: 'PATCH', data: addonGroupData })
      .then(addonGroup => (
        updateAddonGroupSuccess(dispatch, requestId, addonGroup, saveAndContinue)
      ))
      .catch(error => updateAddonGroupFailure(dispatch, requestId, error));
  };
}

function syncAddonGroupSuccess(dispatch, requestId) {
  dispatch({
    type: ADDON_GROUP_SYNC_SUCCESS,
    requestId,
  });
}

function syncAddonGroupFailure(dispatch, requestId, error) {
  dispatch({
    type: ADDON_GROUP_SYNC_FAILURE,
    requestId,
    error,
  });
}

export function syncAddonGroup(pk) {
  return (dispatch, getState) => {
    const requestId = `sync-${pk}`;
    const request = getRequest(getState(), requestId);

    if (request.loading) {
      return true;
    }

    dispatch({
      type: ADDON_GROUP_SYNC,
      requestId,
    });

    return apiFetch(`addon_group/${pk}/sync/`, { method: 'POST' })
      .then(() => syncAddonGroupSuccess(dispatch, requestId))
      .catch(error => syncAddonGroupFailure(dispatch, requestId, error));
  };
}
