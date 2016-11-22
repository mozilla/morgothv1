import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import AddonGroupsList from '../addon-groups/AddonGroupsList';
import QueryAddonGroups from '../data/QueryAddonGroups';


const PAGE_SIZE = 10;

function AddonGroupsListPage({ location }) {
  const page = parseInt(location.query.page, 10) || 0;

  return (
    <Paper zDepth={2} className="page">
      <QueryAddonGroups limit={PAGE_SIZE} offset={page * PAGE_SIZE} />
      <AddonGroupsList page={page} pageSize={PAGE_SIZE} />
    </Paper>
  );
}

AddonGroupsListPage.propTypes = {
  location: pt.object.isRequired,
};

export default AddonGroupsListPage;
