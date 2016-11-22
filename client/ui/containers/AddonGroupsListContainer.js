import { connect } from 'react-redux';

import { getPage, getCount, getRequest } from '../state/addonGroups/selectors';


function mapStateToProps(state, { page, pageSize }) {
  return {
    addonGroups: getPage(state, page, pageSize),
    request: getRequest(state, 'addon-groups'),
    count: getCount(state),
  };
}

export default connect(mapStateToProps);
