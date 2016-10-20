import { DEFAULT_REQUEST } from '../constants';


export function getAddonsList(state) {
  const addons = state.addons.objects;
  const addonList = [];

  Object.keys(addons).forEach(id => {
    addonList.push(addons[id]);
  });

  return addonList;
}

export function getAddon(state, id) {
  return state.addons.objects[id];
}

export function getRequest(state, id) {
  return state.addons.requests[id] || DEFAULT_REQUEST;
}
