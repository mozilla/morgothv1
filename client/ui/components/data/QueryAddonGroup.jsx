import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddonGroup } from '../../state/addonGroups/actions';


class QueryAddonGroup extends React.Component {
  static propTypes = {
    pk: pt.string,
    requestAddonGroup: pt.func,
  }

  componentWillMount() {
    const { pk } = this.props;

    if (pk) {
      this.props.requestAddonGroup(pk);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pk } = this.props;

    if (pk && pk === nextProps.pk) {
      return;
    }

    this.props.requestAddonGroup(pk);
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  dispatch => (bindActionCreators({
    requestAddonGroup,
  }, dispatch)),
)(QueryAddonGroup);
