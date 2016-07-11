import React from 'react';

import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';


class AddonsList extends React.Component {
  componentWillMount() {
    this.props.fetchAddons();
  }

  renderRows(addons) {
    return addons.map((addon, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{addon.name}</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { addons, loading, error } = this.props.addonsList;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.renderRows(addons)}
        </TableBody>
      </Table>
    );
  }
}

export default AddonsList;
