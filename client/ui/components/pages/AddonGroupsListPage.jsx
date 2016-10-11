import React from 'react';

import Paper from 'material-ui/Paper';

import AddonGroupsList from '../AddonGroupsList';


function AddonGroupsListPage() {
  return (
    <Paper zDepth={2} className="page">
      <AddonGroupsList />
    </Paper>
  );
}

export default AddonGroupsListPage;
