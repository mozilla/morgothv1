import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';


// This is needed by Material UI and will be removed as a dependency eventually.
injectTapEventPlugin();

class Root extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes}></Router>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector('#main'));
