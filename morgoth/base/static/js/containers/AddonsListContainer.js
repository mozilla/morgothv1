import { connect } from 'react-redux';

import { fetchAddons, fetchAddonsSuccess, fetchAddonsFailure } from '../actions/addons';
import AddonsList from '../components/AddonsList.jsx';


const mapStateToProps = (state) => {
  return {
    addonsList: state.addons.addonsList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddons: () => {
      dispatch(fetchAddons()).then((response) => {
        if (response.error) {
          dispatch(fetchAddonsFailure(response.payload));
        } else {
          dispatch(fetchAddonsSuccess(response.payload));
        }
      });
    }
  }
};

const AddonsListContainer = connect(mapStateToProps, mapDispatchToProps)(AddonsList);

export default AddonsListContainer;
