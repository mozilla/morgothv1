import React from 'react';

import Paper from 'material-ui/Paper';

import AddonGroupsList from '../AddonGroupsList';
import QueryAddonGroups from '../data/QueryAddonGroups';


function AddonGroupsListPage() {
  return (
    <Paper zDepth={2} className="page">
      <QueryAddonGroups />
      <AddonGroupsList />
    </Paper>
  );
}

export default AddonGroupsListPage;
