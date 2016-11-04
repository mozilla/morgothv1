import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';

import { createAddon, updateAddon } from '../state/addons/actions';
import { getAddon, getRequest } from '../state/addons/selectors';


function mapStateToProps(state, { pk }) {
  let saveRequest;

  if (pk) {
    saveRequest = getRequest(state, `update-${pk}`);
  } else {
    saveRequest = getRequest(state, 'create');
  }

  const addon = getAddon(state, pk);

  const props = {
    addon,
    fetchRequest: getRequest(state, `addon-${pk}`),
    saveRequest,
  };

  return props;
}

function mapDispatchToProps(dispatch, { pk }) {
  function saveAddon(data, saveAndContinue) {
    if (pk) {
      return updateAddon(pk, data, saveAndContinue);
    }
    return createAddon(data, saveAndContinue);
  }

  return bindActionCreators({
    initialize,
    saveAddon,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps);
