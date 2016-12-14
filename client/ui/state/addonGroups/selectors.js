import { DEFAULT_REQUEST } from '../constants';

import { getAddon } from '../addons/selectors';


function mapAddons(state) {
  let addonGroup = this;
  for (const key of ['addons', 'built_in_addons', 'qa_addons', 'shipped_addons']) {
    addonGroup = {
      ...addonGroup,
      [key]: this[key].map(addonId => getAddon(state, addonId)),
    };
  }
  return addonGroup;
}

export function getAddonGroupsList(state) {
  const addonGroups = state.addonGroups.objects;
  return Object.keys(addonGroups).map(id => addonGroups[id]);
}

export function getAddonGroup(state, id) {
  const addonGroup = state.addonGroups.objects[id];

  if (addonGroup) {
    return {
      ...addonGroup::mapAddons(state),
    };
  }

  return addonGroup;
}

export function getRequest(state, id) {
  return {
    ...state.addonGroups.requests[id] || DEFAULT_REQUEST,
  };
}

export function getCount(state) {
  return state.addonGroups.pagination.count;
}

export function getPage(state) {
  const ids = state.addonGroups.pagination.ids || [];
  return ids.map(id => getAddonGroup(state, id));
}
