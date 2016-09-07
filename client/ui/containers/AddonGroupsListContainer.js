import { connect } from 'react-redux';

import { fetchAddonGroups } from '../actions/addon-groups';


function mapStateToProps(state) {
  return {
    addonGroupsList: state.addonGroups.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAddonGroups: () => {
      dispatch(fetchAddonGroups());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
