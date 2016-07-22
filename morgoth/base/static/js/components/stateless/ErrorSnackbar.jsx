import React, { PropTypes as pt } from 'react';
import Snackbar from 'material-ui/Snackbar';


function ErrorSnackbar({ error }) {
  const isError = error && error.detail;

  return (
    <Snackbar
      open={isError}
      message={isError ? error.detail : ''}
      autoHideDuration={3000}
    />
  );
}

ErrorSnackbar.propTypes = {
  error: pt.array.isRequired,
  open: pt.bool,
};

export default ErrorSnackbar;
