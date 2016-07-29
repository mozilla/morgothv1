import React from 'react';

import Paper from 'material-ui/Paper';

import AddonGroupsListContainer from '../../containers/AddonGroupsListContainer';


function AddonGroupsListPage() {
  return (
    <Paper zDepth={2} className="page">
      <AddonGroupsListContainer />
    </Paper>
  );
}

export default AddonGroupsListPage;
