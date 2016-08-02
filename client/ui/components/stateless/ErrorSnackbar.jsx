import React, { PropTypes as pt } from 'react';
import Snackbar from 'material-ui/Snackbar';


function ErrorSnackbar({ error }) {
  const isError = Boolean(error && error.detail);

  return (
    <Snackbar
      open={isError}
      message={isError ? error.detail : ''}
      autoHideDuration={3000}
    />
  );
}

ErrorSnackbar.propTypes = {
  error: pt.array,
};

export default ErrorSnackbar;
