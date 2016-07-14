import React from 'react';

import Paper from 'material-ui/Paper';

import NotFound from '../components/NotFound.jsx';


class NotFoundPage extends React.Component {
  render() {
    return (
      <Paper zDepth={2}>
        <NotFound />
      </Paper>
    )
  }
}

export default NotFoundPage;
