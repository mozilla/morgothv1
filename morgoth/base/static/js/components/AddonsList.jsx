import React, { PropTypes as pt } from 'react';

import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';


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
        <TableRowColumn>
          {addon.id}
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { addons } = this.props.addonsList;

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
