import React from 'react';
import { browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';


class HomeMenu extends React.Component {
  render() {
    return (
      <Paper zDepth={2}>
        <List>
          <ListItem
            onClick={(() => { browserHistory.push('/addons/') })}
            primaryText="Addons"
            leftAvatar={<Avatar icon={<ActionExtension />} />}
            rightIcon={<NavigationChevronRight />}
          />

          <ListItem
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
