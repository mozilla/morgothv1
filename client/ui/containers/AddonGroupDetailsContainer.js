import { connect } from 'react-redux';

import {
  createAddonGroup, fetchAddonGroup, resetAddonGroup, resetCreateAddonGroup, resetUpdateAddonGroup,
  updateAddonGroup,
} from '../actions/addon-groups';
import { fetchAddons } from '../actions/addons';


function mapStateToProps({ addonGroups, addons }) {
  const props = {
    activeAddonGroup: addonGroups.active,
    addonsList: addons.list,
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
    fetchAddonGroup: () => {
      if (pk) {
        dispatch(fetchAddonGroup(pk));
      }
    },
    fetchAddons: () => {
      dispatch(fetchAddons());
    },
    resetAll: () => {
      dispatch(resetAddonGroup());
      dispatch(resetCreateAddonGroup());
      dispatch(resetUpdateAddonGroup());
    },
    save: data => saveAddonGroup(data),
    saveAndContinue: data => saveAddonGroup(data, true),
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
