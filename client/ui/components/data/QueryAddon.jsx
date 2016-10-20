import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddon } from '../../state/addons/actions';


class QueryAddon extends React.Component {
  static propTypes = {
    pk: pt.string,
    requestAddon: pt.func,
  }

  componentWillMount() {
    const { pk } = this.props;

    if (pk) {
      this.props.requestAddon(pk);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pk } = this.props;

    if (pk && pk === nextProps.pk) {
      return;
    }

    this.props.requestAddon(pk);
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  dispatch => (bindActionCreators({
    requestAddon,
  }, dispatch)),
)(QueryAddon);
