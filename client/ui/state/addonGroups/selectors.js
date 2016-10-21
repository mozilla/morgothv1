import { DEFAULT_REQUEST } from '../constants';


export function getAddonGroupsList(state) {
  const addonGroups = state.addonGroups.objects;
  const addonGroupsList = [];

  Object.keys(addonGroups).forEach(id => {
    addonGroupsList.push(addonGroups[id]);
  });

  return addonGroupsList;
}

export function getAddonGroup(state, id) {
  return state.addonGroups.objects[id];
}

export function getRequest(state, id) {
  return state.addonGroups.requests[id] || DEFAULT_REQUEST;
}
