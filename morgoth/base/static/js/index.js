import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import configureStore from './stores/configureStore'


// This is needed by Material UI and will be removed as a dependency eventually.
injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes}></Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector('#main'));
