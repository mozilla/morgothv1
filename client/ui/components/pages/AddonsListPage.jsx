import React from 'react';

import Paper from 'material-ui/Paper';

import AddonsList from '../addons/AddonsList';
import QueryAddons from '../data/QueryAddons';


function AddonsListPage() {
  return (
    <Paper zDepth={2} className="page">
      <QueryAddons />
      <AddonsList />
    </Paper>
  );
}

export default AddonsListPage;
