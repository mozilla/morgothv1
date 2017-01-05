import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import SyncDiff from '../addon-groups/SyncDiff';


function AddonGroupsSyncPage(props) {
  return (
    <Paper zDepth={2} className="page">
      <SyncDiff type={props.route.sync} />
    </Paper>
  );
}

AddonGroupsSyncPage.propTypes = {
  route: pt.object,
};

export default AddonGroupsSyncPage;
