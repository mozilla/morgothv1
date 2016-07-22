import React, { PropTypes as pt } from 'react';
import { browserHistory, Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FetchErrorList from './stateless/FetchErrorList.jsx';
import LoadingIndicator from './stateless/LoadingIndicator.jsx';


const style = {
  button: {
    float: 'right',
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
};

class AddonsList extends React.Component {
  static propTypes = {
    addonsList: pt.object.isRequired,
    fetchAddons: pt.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchAddons();
  }

  goto(url) {
    browserHistory.push(url);
  }

  renderRows(addons) {
    return addons.map((addon, index) =>
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`/addons/${addon.id}/`}>{addon.name}</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/addons/${addon.id}/`}>{addon.version}</Link>
        </TableRowColumn>
        <TableRowColumn className="align-right">
          <RaisedButton
            onClick={() => this.goto(`/addons/${addon.id}/`)}
            label="Edit"
            style={style.button}
            primary
          />
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { addons, error, loading } = this.props.addonsList;

    if (loading) {
      return (
        <div className="wrapper align-center">
          <LoadingIndicator />
        </div>
      );
    }

    if (error) {
      return (
        <div className="wrapper align-center">
          <FetchErrorList errors={error} />
        </div>
      );
    }

    return (
      <div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup className="align-right" lastChild>
            <RaisedButton
              label="Create New Addon"
              onClick={() => this.goto('/addons/new/')}
            />
          </ToolbarGroup>
        </Toolbar>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Version</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {this.renderRows(addons)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default AddonsList;
