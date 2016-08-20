import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import AddonGroupDetailsContainer from '../../containers/AddonGroupDetailsContainer';


function AddonGroupDetailsPage(props) {
  return (
    <Paper zDepth={2} className="page">
      <AddonGroupDetailsContainer pk={props.params.pk} />
    </Paper>
  );
}

AddonGroupDetailsPage.propTypes = {
  params: pt.object,
};

export default AddonGroupDetailsPage;
