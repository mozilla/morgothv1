import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddons } from '../../state/addons/actions';


class QueryAddons extends React.Component {
  static propTypes = {
    limit: pt.number,
    offset: pt.number,
    requestAddons: pt.func,
  }

  componentWillMount() {
    const { limit, offset } = this.props;
    this.props.requestAddons(limit, offset);
  }

  componentWillReceiveProps(nextProps) {
    const { limit, offset } = this.props;
    if (limit !== nextProps.limit || offset !== nextProps.offset) {
      this.props.requestAddons(nextProps.limit, nextProps.offset);
    }
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
