import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Page from './components/Page.jsx';
import AddonDetailsPage from './pages/AddonDetailsPage.jsx';
import AddonsListPage from './pages/AddonsListPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


export default (
  <Route path="/" title="Morgoth" component={Page}>
    <IndexRoute component={HomePage} />
    <Route path="/addons/" title="Addons">
      <IndexRoute component={AddonsListPage} />
      <Route path="/addons/:pk/" title="Edit" component={AddonDetailsPage} />
    </Route>
    <Route path="/addon_groups/" title="Addon Groups" component={AddonsListPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
