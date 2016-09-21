import { push } from 'react-router-redux';

import apiFetch from '../utils/apiFetch';


// AddonGroups list
export const FETCH_ADDON_GROUPS_REQUEST = 'FETCH_ADDON_GROUPS_REQUEST';
export const FETCH_ADDON_GROUPS_SUCCESS = 'FETCH_ADDON_GROUPS_SUCCESS';
export const FETCH_ADDON_GROUPS_FAILURE = 'FETCH_ADDON_GROUPS_FAILURE';
export const RESET_ADDON_GROUPS = 'RESET_ADDON_GROUPS';

// Create an addon group
export const CREATE_ADDON_GROUP_REQUEST = 'CREATE_ADDON_GROUP_REQUEST';
export const CREATE_ADDON_GROUP_SUCCESS = 'CREATE_ADDON_GROUP_SUCCESS';
export const CREATE_ADDON_GROUP_FAILURE = 'CREATE_ADDON_GROUP_FAILURE';
export const RESET_NEW_ADDON_GROUP = 'RESET_NEW_ADDON_GROUP';

// Fetch a single addon group
export const FETCH_ADDON_GROUP_REQUEST = 'FETCH_ADDON_GROUP_REQUEST';
export const FETCH_ADDON_GROUP_SUCCESS = 'FETCH_ADDON_GROUP_SUCCESS';
export const FETCH_ADDON_GROUP_FAILURE = 'FETCH_ADDON_GROUP_FAILURE';
export const RESET_ADDON_GROUP = 'RESET_ADDON_GROUP';

// Update an addon group
export const UPDATE_ADDON_GROUP_REQUEST = 'UPDATE_ADDON_GROUP_REQUEST';
export const UPDATE_ADDON_GROUP_SUCCESS = 'UPDATE_ADDON_GROUP_SUCCESS';
export const UPDATE_ADDON_GROUP_FAILURE = 'UPDATE_ADDON_GROUP_FAILURE';
export const RESET_UPDATE_ADDON_GROUP = 'RESET_UPDATE_ADDON_GROUP';

// Sync an addon group
export const SYNC_ADDON_GROUP_REQUEST = 'SYNC_ADDON_GROUP_REQUEST';
export const SYNC_ADDON_GROUP_SUCCESS = 'SYNC_ADDON_GROUP_SUCCESS';
export const SYNC_ADDON_GROUP_FAILURE = 'SYNC_ADDON_GROUP_FAILURE';


function apiError(type, error) {
  return {
    type,
    error,
  };
}

function requestAddonGroups() {
  return {
    type: FETCH_ADDON_GROUPS_REQUEST,
  };
}

function receivedAddonGroups(addonGroups) {
  return {
    type: FETCH_ADDON_GROUPS_SUCCESS,
    addonGroups,
  };
}

function requestCreateAddonGroup() {
  return {
    type: CREATE_ADDON_GROUP_REQUEST,
  };
}

function receivedCreateAddonGroup(addonGroup) {
  return {
    type: CREATE_ADDON_GROUP_SUCCESS,
    addonGroup,
  };
}

function requestAddonGroup(pk) {
  return {
    type: FETCH_ADDON_GROUP_REQUEST,
    pk,
  };
}

function receivedAddonGroup(addonGroup) {
  return {
    type: FETCH_ADDON_GROUP_SUCCESS,
    addonGroup,
  };
}

function requestUpdateAddonGroup() {
  return {
    type: UPDATE_ADDON_GROUP_REQUEST,
  };
}

function receivedUpdateAddonGroup(addonGroup) {
  return {
    type: UPDATE_ADDON_GROUP_SUCCESS,
    addonGroup,
  };
}

export function resetAddonGroup() {
  return {
    type: RESET_ADDON_GROUP,
  };
}

export function resetCreateAddonGroup() {
  return {
    type: RESET_NEW_ADDON_GROUP,
  };
}

export function resetUpdateAddonGroup() {
  return {
    type: RESET_UPDATE_ADDON_GROUP,
  };
}

function requestSyncAddonGroup() {
  return {
    type: SYNC_ADDON_GROUP_REQUEST,
  };
}

function receivedSyncAddonGroup() {
  return {
    type: SYNC_ADDON_GROUP_REQUEST,
  };
}

export function fetchAddonGroups() {
  return dispatch => {
    dispatch(requestAddonGroups());

    return apiFetch('addon_group/', { method: 'GET' })
      .then(data => dispatch(receivedAddonGroups(data)))
      .catch(error => dispatch(apiError(FETCH_ADDON_GROUPS_FAILURE, error)));
  };
}

export function createAddonGroup(addonGroupData, saveAndContinue) {
  return dispatch => {
    dispatch(requestCreateAddonGroup());

    return apiFetch('addon_group/', { method: 'POST', data: addonGroupData })
      .then(data => {
        if (saveAndContinue) {
          dispatch(push(`/addon_groups/${data.id}/`));
        } else {
          dispatch(push('/addon_groups/'));
        }

        return dispatch(receivedCreateAddonGroup(data));
      })
      .catch(error => dispatch(apiError(CREATE_ADDON_GROUP_FAILURE, error)));
  };
}

export function fetchAddonGroup(pk) {
  return dispatch => {
    dispatch(requestAddonGroup(pk));

    return apiFetch(`addon_group/${pk}/`, { method: 'GET' })
      .then(data => dispatch(receivedAddonGroup((data))))
      .catch(error => dispatch(apiError(FETCH_ADDON_GROUP_FAILURE, error)));
  };
}

export function updateAddonGroup(pk, addonGroupData, saveAndContinue) {
  return dispatch => {
    dispatch(requestUpdateAddonGroup());

    return apiFetch(`addon_group/${pk}/`, { method: 'PATCH', data: addonGroupData })
      .then(data => {
        if (!saveAndContinue) {
          dispatch(push('/addon_groups/'));
        }

        return dispatch(receivedUpdateAddonGroup(data));
      })
      .catch(error => dispatch(apiError(UPDATE_ADDON_GROUP_FAILURE, error)));
  };
}

export function syncAddonGroup(pk) {
  return dispatch => {
    dispatch(requestSyncAddonGroup());

    return apiFetch(`addon_group/${pk}/sync/`, { method: 'POST' })
      .then(data => dispatch(receivedSyncAddonGroup(data)))
      .catch(error => dispatch(apiError(SYNC_ADDON_GROUP_FAILURE, error)));
  };
}
