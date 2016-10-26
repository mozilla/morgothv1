import { connect } from 'react-redux';

import { getPage, getRequest } from '../state/addons/selectors';


function mapStateToProps(state, { page, pageSize }) {
  return {
    addons: getPage(state, page, pageSize),
    request: getRequest(state, 'addons'),
  };
}

export default connect(mapStateToProps);
