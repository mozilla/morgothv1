import { connect } from 'react-redux';

import { fetchAddons, fetchAddonsSuccess, fetchAddonsFailure } from '../actions/addons';
import AddonsList from '../components/AddonsList.jsx';


const mapStateToProps = (state) => {
  return {
    addonsList: state.addons.AddonsList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddons: () => {
      dispatch(fetchAddons()).then((response) => {
        if (response.error) {
          fetchAddonsFailure(response.payload);
        } else {
          fetchAddonsSuccess(response.payload);
        }
      });
    }
  }
};

const AddonsListContainer = connect(mapStateToProps, mapDispatchToProps)(AddonsList);

export default AddonsListContainer;
