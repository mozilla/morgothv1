import React, { PropTypes as pt } from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';


const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
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
    const { addons, error, loading } = this.props.addonsList;

    if (loading) {
      return (
        <div className="wrapper align-center">
          <RefreshIndicator size={48} status="loading" style={style.refresh} top={0} left={0} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="wrapper align-center">Error!</div>
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
