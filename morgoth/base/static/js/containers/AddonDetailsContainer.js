import { connect } from 'react-redux';

import { fetchAddon } from '../actions/addons';
import AddonForm from '../components/AddonForm.jsx';


function mapStateToProps(state) {
  const props = {
    activeAddon: state.addons.activeAddon,
  };

  // If there is an active addon populate the form
  if (state.addons.activeAddon) {
    props.initialValues = state.addons.activeAddon.addon;
  }

  return props;
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchAddon: () => {
      dispatch(fetchAddon(props.pk));
    },
  };
}

const AddonDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(AddonForm);

export default AddonDetailsContainer;
