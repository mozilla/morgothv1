import { connect } from 'react-redux';

import { getAddonsList, getRequest } from '../state/addons/selectors';


function mapStateToProps(state) {
  return {
    addons: getAddonsList(state),
    request: getRequest(state, 'addons'),
  };
}

export default connect(mapStateToProps);
