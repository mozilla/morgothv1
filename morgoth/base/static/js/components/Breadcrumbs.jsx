import React, { PropTypes as pt } from 'react';
import { Link } from 'react-router';


class Breadcrumbs extends React.Component {
  static propTypes = {
    routes: pt.array.isRequired,
  };

  renderCrumbs(routes) {
    return routes.map((route, index) => {
      const { path, title } = route;

      if (path && path !== '*') {
        return (
          <li key={index}>
            <Link to={path}>{title || path}</Link>
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
