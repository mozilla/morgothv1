import { connect } from 'react-redux';

import { getAddonGroupsList, getRequest } from '../state/addonGroups/selectors';


function mapStateToProps(state) {
  return {
    addonGroups: getAddonGroupsList(state),
    request: getRequest(state, 'addon-groups'),
  };
}

export default connect(mapStateToProps);
