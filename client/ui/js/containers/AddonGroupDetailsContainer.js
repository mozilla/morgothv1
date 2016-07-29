import { connect } from 'react-redux';

import {
  createAddonGroup, fetchAddonGroup, resetAddonGroup, resetCreateAddonGroup, resetUpdateAddonGroup,
  updateAddonGroup,
} from '../actions/addon-groups';
import AddonGroupForm from '../components/AddonGroupForm.jsx';


function mapStateToProps({ addonGroups }) {
  const props = {
    activeAddonGroup: addonGroups.active,
    createAddonGroup: addonGroups.create,
    updateAddonGroup: addonGroups.update,
  };

  // If there is an active addon group populate the form
  if (addonGroups.active.addonGroup) {
    props.initialValues = addonGroups.active.addonGroup;
  }

  return props;
}

function mapDispatchToProps(dispatch, { pk }) {
  function saveAddonGroup(data, saveAndContinue) {
    if (pk) {
      return dispatch(updateAddonGroup(pk, data, saveAndContinue));
    }
    return dispatch(createAddonGroup(data, saveAndContinue));
  }

  return {
    handleSave: data => saveAddonGroup(data),
    handleSaveAndContinue: data => saveAddonGroup(data, true),
    resetAll: () => {
      dispatch(resetAddonGroup());
      dispatch(resetCreateAddonGroup());
      dispatch(resetUpdateAddonGroup());
    },
    fetchAddonGroup: () => {
      if (pk) {
        dispatch(fetchAddonGroup(pk));
      }
    },
  };
}

const AddonDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(AddonGroupForm);

export default AddonDetailsContainer;
