import React from 'react';

import AppBar from 'material-ui/AppBar';
import {blueGrey400, blueGrey500, blueGrey700, orange800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    primary3Color: blueGrey400,
    accent1Color: orange800
  }
});

class Page extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="Morgoth" showMenuIconButton={false} />
          <div className="wrapper">
            <Paper zDepth={2}>
              <List>
                <ListItem primaryText="Addons" leftIcon={<ActionExtension />} rightIcon={<ActionInfo />} />
                <ListItem primaryText="Addon Groups" leftIcon={<NavigationApps />} rightIcon={<ActionInfo />} />
              </List>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Page;
