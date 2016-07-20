import React, { PropTypes as pt } from 'react';

import AppBar from 'material-ui/AppBar';
import { indigo500, indigo700, grey400, orange800 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Breadcrumbs from './Breadcrumbs.jsx';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: grey400,
    accent1Color: orange800,
  },
});

function Page({ routes, children }) {
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
}

Page.propTypes = {
  routes: pt.array.isRequired,
  children: pt.any,
};

export default Page;
