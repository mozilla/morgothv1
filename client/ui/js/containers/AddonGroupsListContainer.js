import { connect } from 'react-redux';

import { fetchAddonGroups } from '../actions/addon-groups';
import AddonGroupsList from '../components/AddonGroupsList.jsx';


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

const AddonsListContainer = connect(mapStateToProps, mapDispatchToProps)(AddonGroupsList);

export default AddonsListContainer;
