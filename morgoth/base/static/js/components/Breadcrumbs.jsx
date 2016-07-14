import React, { PropTypes as pt } from 'react';
import { Link } from 'react-router';


class Breadcrumbs extends React.Component {
  static propTypes = {
    routes: pt.array.isRequired,
  };

  renderCrumbs(routes) {
    return routes.map((route, index) => {
      if (route.path && route.path !== '*') {
        return (
          <li key={index}>
            <Link to={route.path}>{route.title || route.path}</Link>
          </li>
        );
      }
      return '';
    });
  }

  render() {
    const { routes } = this.props;

    return (
      <ul className="breadcrumbs">
        {this.renderCrumbs(routes)}
      </ul>
    );
  }
}

export default Breadcrumbs;
