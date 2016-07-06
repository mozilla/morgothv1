import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AddonsList from './components/AddonsList.jsx'
import HomeMenu from './components/HomeMenu.jsx'
import NoMatch from './components/NoMatch.jsx';
import Page from './components/Page.jsx';


// This is needed by Material UI and will be removed as a dependency eventually.
injectTapEventPlugin();

class Root extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" title="Morgoth" component={Page}>
          <IndexRoute component={HomeMenu} />
          <Route path="/addons" title="Addons" component={AddonsList} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector('#main'));
