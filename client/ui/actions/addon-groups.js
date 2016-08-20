import { push } from 'react-router';

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

export function fetchAddonGroups() {
  return dispatch => {
    dispatch(requestAddonGroups());

    return apiFetch('addon_group/', {
      method: 'GET',
      success: receivedAddonGroups,
      error: error => apiError(FETCH_ADDON_GROUPS_FAILURE, error),
      dispatch,
    });
  };
}

export function createAddonGroup(data, saveAndContinue) {
  return dispatch => {
    dispatch(requestCreateAddonGroup());

    return apiFetch('addon_group/', {
      method: 'POST',
      data,
      success: addonGroup => {
        if (saveAndContinue) {
          dispatch(push(`/addon_groups/${addonGroup.id}/`));
        } else {
          dispatch(push('/addon_groups/'));
        }

        return receivedCreateAddonGroup(addonGroup);
      },
      error: error => apiError(CREATE_ADDON_GROUP_FAILURE, error),
      dispatch,
    });
  };
}

export function fetchAddonGroup(pk) {
  return dispatch => {
    dispatch(requestAddonGroup(pk));

    return apiFetch(`addon_group/${pk}/`, {
      method: 'GET',
      success: receivedAddonGroup,
      error: error => apiError(FETCH_ADDON_GROUP_FAILURE, error),
      dispatch,
    });
  };
}

export function updateAddonGroup(pk, data, saveAndContinue) {
  return dispatch => {
    dispatch(requestUpdateAddonGroup());

    return apiFetch(`addon_group/${pk}/`, {
      method: 'PATCH',
      data,
      success: addonGroup => {
        if (!saveAndContinue) {
          dispatch(push('/addon_groups/'));
        }

        return receivedUpdateAddonGroup(addonGroup);
      },
      error: error => apiError(UPDATE_ADDON_GROUP_FAILURE, error),
      dispatch,
    });
  };
}
