import React from 'react';

import Paper from 'material-ui/Paper';

import AddonsList from '../AddonsList';


function AddonsListPage() {
  return (
    <Paper zDepth={2} className="page">
      <AddonsList />
    </Paper>
  );
}

export default AddonsListPage;
