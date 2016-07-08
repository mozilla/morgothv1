import React from 'react';

import Paper from 'material-ui/Paper';


class AddonsList extends React.Component {
  componentWillMount() {
    this.props.fetchAddons();
  }

  render() {
    const { addons, loading, error } = this.props.addonsList;

    return (
      <Paper zDepth={2}>
        { addons }
      </Paper>
    );
  }
}

export default AddonsList;
