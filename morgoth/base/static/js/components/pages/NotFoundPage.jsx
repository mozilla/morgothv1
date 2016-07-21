import React from 'react';

import Paper from 'material-ui/Paper';

import NotFound from '../NotFound.jsx';


function NotFoundPage() {
  return (
    <Paper zDepth={2} className="page">
      <NotFound />
    </Paper>
  );
}

export default NotFoundPage;
