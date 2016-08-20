/* global document, fetch, Headers */

const API_ROOT = '/api/v1/';

export default function apiFetch(url, options = {}) {
  let dispatch;
  let handleSuccess;
  let handleError;
  let queryString = '';

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('X-CSRFToken', document.getElementsByTagName('body')[0].dataset.csrf);

  const settings = {
    headers,
    credentials: 'include',
    ...options,
  };

  // Convert `data` to `body` if necessary.
  if ('data' in settings) {
    if ('body' in settings) {
      throw new Error('Only pass one of `settings.data` and `settings.body`.');
    }

    const method = (settings.method || 'GET').toUpperCase();

    if (method !== 'GET' && method !== 'HEAD') {
      settings.body = JSON.stringify(settings.data);
    } else {
      queryString = '?';
      Object.keys(settings.data).forEach(key => {
        queryString += `${key}=${encodeURIComponent(settings.data[key])}&`;
      });
      queryString.slice(0, -1);
    }

    delete settings.data;
  }

  // TODO: Clean up the following section.

  // Extract the `dispatch` function from settings.
  if (typeof settings.dispatch === 'function') {
    dispatch = settings.dispatch;
    delete settings.dispatch;
  } else {
    throw new Error('A valid `dispatch` function must be provided.');
  }

  // Extract the `handleSuccess` function from settings.
  if (typeof settings.success === 'function') {
    handleSuccess = settings.success;
    delete settings.success;
  } else {
    throw new Error('A valid `success` function must be provided.');
  }

  // Extract the `handleError` function from settings.
  if (typeof settings.error === 'function') {
    handleError = settings.error;
    delete settings.error;
  } else {
    throw new Error('A valid `error` function must be provided.');
  }

  return fetch(`${API_ROOT}${url}${queryString}`, settings)
    .then(response => Promise.all([response.ok, response.json()]))
    .then(([ok, data]) => {
      if (ok) {
        dispatch(handleSuccess(data));
      } else {
        dispatch(handleError(data));
      }
    })
    .catch(error => {
      dispatch(handleError({ message: error.message }));
    });
}
