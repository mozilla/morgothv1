import React from 'react';
import { browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';


class HomeMenu extends React.Component {
  goto(path) {
    browserHistory.push(path);
  }

  render() {
    return (
      <Paper zDepth={2}>
        <List>
          <ListItem
            onClick={() => this.goto('/addons/')}
            primaryText="Addons"
            leftAvatar={<Avatar icon={<ActionExtension />} />}
            rightIcon={<NavigationChevronRight />}
          />

          <ListItem
            onClick={() => this.goto('/addon_groups/')}
            primaryText="Addon Groups"
            leftAvatar={<Avatar icon={<NavigationApps />} />}
            rightIcon={<NavigationChevronRight />}
          />
        </List>
      </Paper>
    );
  }
}

export default HomeMenu;
