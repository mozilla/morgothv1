import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddons } from '../../state/addons/actions';


class QueryAddons extends React.Component {
  static propTypes = {
    requestAddons: pt.func,
  }

  componentWillMount() {
    this.props.requestAddons();
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  dispatch => (bindActionCreators({
    requestAddons,
  }, dispatch)),
)(QueryAddons);
