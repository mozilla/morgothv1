import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddons } from '../../state/addons/actions';


class QueryAddons extends React.Component {
  static propTypes = {
    limit: pt.number,
    offset: pt.number,
    requestAddons: pt.func,
    search: pt.string,
  }

  componentWillMount() {
    const { limit, offset, search } = this.props;
    this.props.requestAddons(limit, offset, search);
  }

  componentWillReceiveProps(nextProps) {
    const { limit, offset, search } = this.props;
    if (limit !== nextProps.limit || offset !== nextProps.offset || search !== nextProps.search) {
      this.props.requestAddons(nextProps.limit, nextProps.offset, nextProps.search);
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
