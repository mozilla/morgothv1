import { DEFAULT_REQUEST } from '../constants';

import { getAddon } from '../addons/selectors';


export function getAddonGroupsList(state) {
  const addonGroups = state.addonGroups.objects;
  return Object.keys(addonGroups).map(id => addonGroups[id]);
}

export function getAddonGroup(state, id) {
  const addonGroup = state.addonGroups.objects[id];

  if (addonGroup) {
    return {
      ...addonGroup,
      addons: addonGroup.addons.map(addonId => getAddon(state, addonId)),
      built_in_addons: addonGroup.built_in_addons.map(addonId => getAddon(state, addonId)),
      qa_addons: addonGroup.qa_addons.map(addonId => getAddon(state, addonId)),
      shipped_addons: addonGroup.shipped_addons.map(addonId => getAddon(state, addonId)),
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

export function getPage(state, page, pageSize) {
  const ids = [...state.addonGroups.pagination.ids || []];

  if (ids) {
    const start = page * pageSize;
    const end = start + pageSize;
    return ids.slice(start, end).map(id => getAddonGroup(state, id));
  }

  return [];
}
