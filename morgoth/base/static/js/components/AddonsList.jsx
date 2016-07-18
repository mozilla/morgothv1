import React, { PropTypes as pt } from 'react';

import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';

import FetchErrorList from './stateless/FetchErrorList.jsx';
import LoadingIndicator from './stateless/LoadingIndicator.jsx';


class AddonsList extends React.Component {
  static propTypes = {
    addonsList: pt.object.isRequired,
    fetchAddons: pt.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchAddons();
  }

  renderRows(addons) {
    return addons.map((addon, index) =>
      <TableRow key={index}>
        <TableRowColumn>{addon.name}</TableRowColumn>
        <TableRowColumn>{addon.version}</TableRowColumn>
        <TableRowColumn className="align-right">
          {addon.id}
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { addons, error, loading } = this.props.addonsList;

    if (loading) {
      return (
        <div className="wrapper align-center"><LoadingIndicator /></div>
      );
    }

    if (error) {
      return (
        <div className="wrapper align-center"><FetchErrorList errors={error} /></div>
      );
    }

    return (
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
    );
  }
}

export default AddonsList;
