import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { createAddon, fetchAddon, updateAddon } from '../actions/addons';
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
  function saveAddon(data) {
    if (pk) {
      return dispatch(updateAddon(pk, data));
    }
    return dispatch(createAddon(data));
  }

  return {
    handleSave: data => {
      const save = saveAddon(data);

      save.then(() => {
        // TODO: This executes whether the save was successful or not. That needs to be fixed.
        browserHistory.push('/addons/');
      });
    },
    handleSaveAndContinue: data => {
      const save = saveAddon(data);

      save.then(() => {
        // TODO: This executes whether the save was successful or not. That needs to be fixed.
        if (!pk) {
          // TODO: Redirect to /addons/:id/ with ID of newly created addon.
        }
      });
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
