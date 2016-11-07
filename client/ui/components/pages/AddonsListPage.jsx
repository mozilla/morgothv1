import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import AddonsList from '../addons/AddonsList';
import QueryAddons from '../data/QueryAddons';


const PAGE_SIZE = 20;

function AddonsListPage({ location }) {
  const page = parseInt(location.query.page, 10) || 0;

  return (
    <Paper zDepth={2} className="page">
      <QueryAddons limit={PAGE_SIZE} offset={page * PAGE_SIZE} />
      <AddonsList page={page} pageSize={PAGE_SIZE} />
    </Paper>
  );
}

AddonsListPage.propTypes = {
  location: pt.object.isRequired,
};

export default AddonsListPage;
