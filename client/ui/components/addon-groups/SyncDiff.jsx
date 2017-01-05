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


function DiffAddon({ diff, addon }) {
  let classes = '';

  if (diff.added.includes(addon.id)) {
    classes = 'added';
  } else if (diff.removed.includes(addon.id)) {
    classes = 'removed';
  } else if (diff.upgraded.includes(addon.id)) {
    classes = 'upgraded';
  } else if (diff.downgraded.includes(addon.id)) {
    classes = 'downgraded';
  }

  return (
    <div className={`addon ${classes}`}>
      {addon.name} <span>v{addon.version}</span>
    </div>
  );
}


DiffAddon.propTypes = {
  addon: pt.object,
  diff: pt.object,
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
      const synced = addonGroup[`${type}_synced`];
      const currAddons = addonGroup[`${type}_addons`];
      const diff = addonGroup[`${type}_sync_diff`];

      if (!synced) {
        groups.push((
          <div className="group-diff" key={addonGroup.id}>
            <strong>{addonGroup.browser_version}</strong>
            <div className="diff">
              <div className="diff-from">
                <header>Current Addons</header>
                {
                  currAddons.map(addon => (
                    <DiffAddon key={addon.id} diff={diff} addon={addon} />
                  ))
                }
              </div>
              <div className="diff-to">
                <header>Addons To Be Synced</header>
                {
                  addonGroup.addons.map(addon => (
                    <DiffAddon key={addon.id} diff={diff} addon={addon} />
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

    const groups = this.renderGroups();
    const synced = groups.length === 0;

    return (
      <div>
        {
          synced ?
            <div>All the groups are already synced.</div> :
            groups
        }
        <Toolbar style={style.toolbar}>
          <ToolbarGroup className="align-right" lastChild>
            {
              synced ?
                null :
                <RaisedButton
                  label="Confirm Sync"
                  primary
                />
            }
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
