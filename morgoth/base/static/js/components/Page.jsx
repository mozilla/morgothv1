import React from 'react';
import { IndexLink } from 'react-router';

import AppBar from 'material-ui/AppBar';
import { blueGrey400, blueGrey500, blueGrey700, orange800 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Breadcrumbs from './Breadcrumbs.jsx'
import HomeMenu from './HomeMenu.jsx'


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
    const { routes } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            className="header"
            title={<Breadcrumbs routes={routes} />}
            showMenuIconButton={false}
          />
          <div className="wrapper">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Page;
