import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component {
  render() {
    return (
      <span className="green">Success!</span>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector('#main'));
