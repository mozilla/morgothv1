import { DEFAULT_REQUEST } from '../constants';


export function getAddonGroupsList(state) {
  const addonGroups = state.addonGroups.objects;
  return Object.keys(addonGroups).map(id => addonGroups[id]);
}

export function getAddonGroup(state, id) {
  return state.addonGroups.objects[id];
}

export function getRequest(state, id) {
  return state.addonGroups.requests[id] || DEFAULT_REQUEST;
}
