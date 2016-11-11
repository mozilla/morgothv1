import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';

import { getAddonsList } from '../state/addons/selectors';
import { createAddonGroup, syncAddonGroups, updateAddonGroup } from '../state/addonGroups/actions';
import { getAddonGroup, getRequest } from '../state/addonGroups/selectors';


function mapStateToProps(state, { pk }) {
  let saveRequest;

  if (pk) {
    saveRequest = getRequest(state, `update-${pk}`);
  } else {
    saveRequest = getRequest(state, 'create');
  }

  const addonGroup = getAddonGroup(state, pk);

  const props = {
    addonGroup,
    addons: getAddonsList(state),
    fetchRequest: getRequest(state, `addon-group-${pk}`),
    saveRequest,
    syncRequest: getRequest(state, `sync-${pk}`),
  };

  // If there is an active addon group populate the form
  if (addonGroup) {
    props.initialValues = addonGroup;
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

  return bindActionCreators({
    initialize,
    saveAddonGroup,
    syncAddonGroups,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps);
