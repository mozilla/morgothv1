import { connect } from 'react-redux';

import { fetchAddons, fetchAddonsSuccess, fetchAddonsFailure } from '../actions/addons';
import AddonsList from '../components/AddonsList.jsx';


function mapStateToProps(state) {
  return {
    addonsList: state.addons.addonsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAddons: () => {
      dispatch(fetchAddons())
        .then(response => {
          response.payload.json().then(jsonData => {
            const data = jsonData === '' ? {} : jsonData;
            if (response.payload.ok) {
              dispatch(fetchAddonsSuccess(data));
            } else {
              dispatch(fetchAddonsFailure(data));
            }
          });
        })
        .catch(error => {
          dispatch(fetchAddonsFailure({ message: error.message }));
        });
    },
  };
}

const AddonsListContainer = connect(mapStateToProps, mapDispatchToProps)(AddonsList);

export default AddonsListContainer;
