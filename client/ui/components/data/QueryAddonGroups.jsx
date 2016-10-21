import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddonGroups } from '../../state/addonGroups/actions';


class QueryAddonGroups extends React.Component {
  static propTypes = {
    requestAddonGroups: pt.func,
  }

  componentWillMount() {
    this.props.requestAddonGroups();
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  dispatch => (bindActionCreators({
    requestAddonGroups,
  }, dispatch)),
)(QueryAddonGroups);
