import { connect } from 'react-redux';

import {
  createAddon, fetchAddon, resetAddon, resetCreateAddon, resetUpdateAddon, updateAddon,
} from '../actions/addons';
import AddonForm from '../components/AddonForm.jsx';


function mapStateToProps({ addons }) {
  const props = {
    activeAddon: addons.active,
    createAddon: addons.create,
    updateAddon: addons.update,
  };

  // If there is an active addon populate the form
  if (addons.active.addon) {
    props.initialValues = addons.active.addon;
  }

  return props;
}

function mapDispatchToProps(dispatch, { pk }) {
  function saveAddon(data, saveAndContinue) {
    if (pk) {
      return dispatch(updateAddon(pk, data, saveAndContinue));
    }
    return dispatch(createAddon(data, saveAndContinue));
  }

  return {
    handleSave: data => saveAddon(data),
    handleSaveAndContinue: data => saveAddon(data, true),
    resetAll: () => {
      dispatch(resetAddon());
      dispatch(resetCreateAddon());
      dispatch(resetUpdateAddon());
    },
    fetchAddon: () => {
      if (pk) {
        dispatch(fetchAddon(pk));
      }
    },
  };
}

const AddonDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(AddonForm);

export default AddonDetailsContainer;
