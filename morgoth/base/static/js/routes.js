import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NoMatch from './components/NoMatch.jsx';
import Page from './components/Page.jsx';
import AddonsListPage from './pages/AddonsListPage.jsx';
import HomePage from './pages/HomePage.jsx';


export default (
  <Route path="/" title="Morgoth" component={Page}>
    <IndexRoute component={HomePage} />
    <Route path="/addons/" title="Addons" component={AddonsListPage} />
    <Route path="/addon_groups/" title="Addon Groups" component={AddonsListPage} />
    <Route path="*" component={NoMatch} />
  </Route>
);
