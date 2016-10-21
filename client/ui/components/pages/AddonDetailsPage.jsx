import React, { PropTypes as pt } from 'react';

import Paper from 'material-ui/Paper';

import AddonForm from '../forms/AddonForm';


function AddonDetailsPage(props) {
  return (
    <Paper zDepth={2} className="page">
      <AddonForm pk={props.params.pk} />
    </Paper>
  );
}

AddonDetailsPage.propTypes = {
  params: pt.object,
};

export default AddonDetailsPage;
