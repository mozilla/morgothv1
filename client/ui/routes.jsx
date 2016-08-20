import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Page from './components/Page.jsx';
import AddonDetailsPage from './components/pages/AddonDetailsPage.jsx';
import AddonGroupDetailsPage from './components/pages/AddonGroupDetailsPage.jsx';
import AddonsListPage from './components/pages/AddonsListPage.jsx';
import AddonGroupsListPage from './components/pages/AddonGroupsListPage.jsx';
import HomePage from './components/pages/HomePage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';


export default (
  <Route path="/" title="Morgoth" component={Page}>
    <IndexRoute component={HomePage} />
    <Route path="/addons/" title="Addons">
      <IndexRoute component={AddonsListPage} />
      <Route
        path="/addons/new/"
        title="New Addon"
        component={AddonDetailsPage}
      />
      <Route
        path="/addons/:pk/"
        title="Edit Addon"
        component={AddonDetailsPage}
      />
    </Route>
    <Route path="/addon_groups/" title="Addon Groups">
      <IndexRoute component={AddonGroupsListPage} />
      <Route
        path="/addon_groups/new/"
        title="New Addon Group"
        component={AddonGroupDetailsPage}
      />
      <Route
        path="/addon_groups/:pk/"
        title="Edit Addon Group"
        component={AddonGroupDetailsPage}
      />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
