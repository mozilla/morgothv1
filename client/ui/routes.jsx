import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import AddonDetailsPage from './components/pages/AddonDetailsPage';
import AddonGroupDetailsPage from './components/pages/AddonGroupDetailsPage';
import AddonsListPage from './components/pages/AddonsListPage';
import AddonGroupsListPage from './components/pages/AddonGroupsListPage';
import HomePage from './components/pages/HomePage';
import NotFoundPage from './components/pages/NotFoundPage';


export default (
  <Route path="/" title="Morgoth" component={App}>
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
