import React from 'react';

import Paper from 'material-ui/Paper';

import AddonsListContainer from '../../containers/AddonsListContainer';


function AddonsListPage() {
  return (
    <Paper zDepth={2} className="page">
      <AddonsListContainer />
    </Paper>
  );
}

export default AddonsListPage;
