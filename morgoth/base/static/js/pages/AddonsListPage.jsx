import React from 'react';

import Paper from 'material-ui/Paper';

import AddonsList from '../containers/AddonsListContainer';


function AddonsListPage() {
  return (
    <Paper zDepth={2}>
      <AddonsList />
    </Paper>
  );
}

export default AddonsListPage;
