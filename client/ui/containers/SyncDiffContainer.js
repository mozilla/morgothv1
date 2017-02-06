import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { syncAddonGroups } from '../state/addonGroups/actions';
import { getAddonGroupsList, getCount } from '../state/addonGroups/selectors';


function mapStateToProps(state) {
  return {
    addonGroups: getAddonGroupsList(state),
    count: getCount(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    syncAddonGroups,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps);
