import React from 'react';

import Paper from 'material-ui/Paper';

import AddonsList from '../containers/AddonsListContainer';


class AddonsListPage extends React.Component {
  render() {
    return (
      <Paper zDepth={2}>
        <AddonsList />
      </Paper>
    )
  }
}

export default AddonsListPage;
