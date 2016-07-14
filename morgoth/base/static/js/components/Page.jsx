import React, { PropTypes as pt } from 'react';

import AppBar from 'material-ui/AppBar';
import { blueGrey400, blueGrey500, blueGrey700, orange800 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Breadcrumbs from './Breadcrumbs.jsx';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    primary3Color: blueGrey400,
    accent1Color: orange800,
  },
});

const Page = props => {
  const { routes, children } = props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar
          className="header"
          title={<Breadcrumbs routes={routes} />}
          showMenuIconButton={false}
        />
        <div className="wrapper">
          {children}
        </div>
      </div>
    </MuiThemeProvider>
  );
};

Page.propTypes = {
  routes: pt.array.isRequired,
  children: pt.any,
};

export default Page;
