import { DEFAULT_REQUEST } from '../constants';


export function getAddonsList(state) {
  const addons = state.addons.objects;
  const addonsList = [];

  Object.keys(addons).forEach(id => {
    addonsList.push(getAddon(state, id));
  });

  return addonsList;
}

export function getAddon(state, id) {
  return {
    ...state.addons.objects[id],
  };
}

export function getRequest(state, id) {
  return state.addons.requests[id] || DEFAULT_REQUEST;
}

export function getCount(state) {
  return state.addons.pagination.count;
}

export function getPage(state, page, pageSize) {
  const { ids } = state.addons.pagination;

  if (ids) {
    const start = page * pageSize;
    const end = start + pageSize;
    return ids.slice(start, end).map(id => getAddon(state, id));
  }

  return [];
}
