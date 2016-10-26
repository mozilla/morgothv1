import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import AddonGroupForm from '../forms/AddonGroupForm';
import QueryAddons from '../data/QueryAddons';


function AddonGroupDetailsPage(props) {
  return (
    <Paper zDepth={2} className="page">
      <QueryAddons limit={20} offset={0} />
      <AddonGroupForm pk={props.params.pk} />
    </Paper>
  );
}

AddonGroupDetailsPage.propTypes = {
  params: pt.object,
};

export default AddonGroupDetailsPage;
