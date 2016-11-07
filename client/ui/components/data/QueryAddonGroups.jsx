import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddonGroups } from '../../state/addonGroups/actions';


class QueryAddonGroups extends React.Component {
  static propTypes = {
    limit: pt.number,
    offset: pt.number,
    requestAddonGroups: pt.func,
  }

  componentWillMount() {
    const { limit, offset } = this.props;
    this.props.requestAddonGroups(limit, offset);
  }

  componentWillReceiveProps(nextProps) {
    const { limit, offset } = this.props;
    if (limit !== nextProps.limit || offset !== nextProps.offset) {
      this.props.requestAddonGroups(nextProps.limit, nextProps.offset);
    }
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
