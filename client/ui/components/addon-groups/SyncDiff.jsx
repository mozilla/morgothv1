import React, { PropTypes as pt } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import LoadingIndicator from '../indicators/LoadingIndicator';
import containSyncDiff from '../../containers/SyncDiffContainer';
import QueryAddonGroups from '../data/QueryAddonGroups';
import goTo from '../../utils/goTo';


const style = {
  toolbar: {
    justifyContent: 'flex-end',
  },
};


class SyncDiff extends React.Component {
  static propTypes = {
    addonGroups: pt.array,
    count: pt.number,
    type: pt.string,
  };

  renderGroups() {
    const { addonGroups, type } = this.props;
    const groups = [];

    addonGroups.forEach(addonGroup => {
      const synced = (type === 'qa') ? addonGroup.qa_synced : addonGroup.shipped_synced;
      const currAddons = (type === 'qa') ? addonGroup.qa_addons : addonGroup.shipped_addons;
      if (!synced) {
        groups.push((
          <div className="group-diff" key={addonGroup.id}>
            <strong>{addonGroup.browser_version}</strong>
            <div className="diff">
              <div className="diff-a">
                {currAddons.map(addon => <div key={addon.id}>{addon.name} v{addon.version}</div>)}
              </div>
              <div className="diff-b">
                {
                  addonGroup.addons.map(addon => (
                    <div key={addon.id}>{addon.name} v{addon.version}</div>
                  ))
                }
              </div>
            </div>
          </div>
        ));
      }
    });

    return groups;
  }

  render() {
    const { addonGroups, count } = this.props;

    if (count !== addonGroups.length) {
      return (
        <div className="wrapper align-center">
          <QueryAddonGroups limit={count || 1} offset={0} />
          <LoadingIndicator />
        </div>
      );
    }

    return (
      <div>
        {this.renderGroups()}
        <Toolbar style={style.toolbar}>
          <ToolbarGroup className="align-right" lastChild>
            <RaisedButton
              label="Confirm Sync"
              primary
            />
            <RaisedButton
              label="Cancel"
              onClick={() => goTo('/addon_groups/')}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default containSyncDiff(SyncDiff);
