import { connect } from 'react-redux';

import {
  createAddon, fetchAddon, resetAddon, resetCreateAddon, resetUpdateAddon, updateAddon,
} from '../actions/addons';


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
    fetchAddon: () => {
      if (pk) {
        dispatch(fetchAddon(pk));
      }
    },
    resetAll: () => {
      dispatch(resetAddon());
      dispatch(resetCreateAddon());
      dispatch(resetUpdateAddon());
    },
    save: data => saveAddon(data),
    saveAndContinue: data => saveAddon(data, true),
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
