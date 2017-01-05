import { connect } from 'react-redux';

import { getAddonGroupsList, getCount } from '../state/addonGroups/selectors';


function mapStateToProps(state) {
  return {
    addonGroups: getAddonGroupsList(state),
    count: getCount(state),
  };
}

export default connect(mapStateToProps);
