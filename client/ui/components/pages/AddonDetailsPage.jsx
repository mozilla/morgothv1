import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import AddonDetailsContainer from '../../containers/AddonDetailsContainer';


function AddonDetailsPage(props) {
  return (
    <Paper zDepth={2} className="page">
      <AddonDetailsContainer pk={props.params.pk} />
    </Paper>
  );
}

AddonDetailsPage.propTypes = {
  params: pt.object,
};

export default AddonDetailsPage;
