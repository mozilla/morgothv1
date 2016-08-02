import { connect } from 'react-redux';

import { fetchAddons } from '../actions/addons';
import AddonsList from '../components/AddonsList.jsx';


function mapStateToProps(state) {
  return {
    addonsList: state.addons.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAddons: () => {
      dispatch(fetchAddons());
    },
  };
}

const AddonsListContainer = connect(mapStateToProps, mapDispatchToProps)(AddonsList);

export default AddonsListContainer;
