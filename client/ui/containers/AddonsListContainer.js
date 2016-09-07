import { connect } from 'react-redux';

import { fetchAddons } from '../actions/addons';


function mapStateToProps(state) {
  return {
    addonsList: state.addons.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAddons: () => {
      dispatch(fetchAddons());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
