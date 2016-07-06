import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AddonsList from './components/AddonsList.jsx'
import HomeMenu from './components/HomeMenu.jsx'
import NoMatch from './components/NoMatch.jsx';
import Page from './components/Page.jsx';


export default (
  <Route path="/" title="Morgoth" component={Page}>
    <IndexRoute component={HomeMenu} />
    <Route path="/addons/" title="Addons" component={AddonsList} />
    <Route path="/addon_groups/" title="Addon Groups" component={AddonsList} />
    <Route path="*" component={NoMatch} />
  </Route>
);
