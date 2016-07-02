import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Page from './components/Page.jsx';


// This is needed by Material UI and will be removed as a dependency eventually.
injectTapEventPlugin();

class Root extends React.Component {
  render() {
    return (
      <Page />
    );
  }
}

ReactDOM.render(<Root />, document.querySelector('#main'));
