const API_ROOT = '/api/v1/';

export default function apiFetch(url, options = {}) {
  let dispatch;
  let handleSuccess;
  let handleError;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const settings = {
    headers,
    ...options,
  };

  // Convert `data` to `body` if necessary.
  if ('data' in settings) {
    if ('body' in settings) {
      throw new Error('Only pass one of `settings.data` and `settings.body`.');
    }

    const method = (settings.method || 'get').toLowerCase();

    if (method !== 'get' && method !== 'head') {
      settings.body = JSON.stringify(settings.data);
    }

    delete settings.data;
  }

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

  return fetch(`${API_ROOT}${url}`, settings)
    .then(response => Promise.all([response.ok, response.json()]))
    .then(values => {
      const ok = values[0];
      const data = values[1];

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
