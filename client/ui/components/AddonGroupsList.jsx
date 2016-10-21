import React, { PropTypes as pt } from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FetchErrorList from './stateless/FetchErrorList';
import LoadingIndicator from './stateless/LoadingIndicator';
import containAddonGroupsList from '../containers/AddonGroupsListContainer';
import goTo from '../utils/goTo';


const style = {
  button: {
    float: 'right',
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
};

class AddonGroupsList extends React.Component {
  static propTypes = {
    addonGroups: pt.array,
    request: pt.object,
  };

  renderRows() {
    const { addonGroups } = this.props;

    return addonGroups.map((addonGroup, index) =>
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`/addon_groups/${addonGroup.id}/`}>{addonGroup.browser_version}</Link>
        </TableRowColumn>
        <TableRowColumn className="align-right">
          <RaisedButton
            onClick={() => goTo(`/addon_groups/${addonGroup.id}/`)}
            label="Edit"
            style={style.button}
          />
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { loading, error } = this.props.request;

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
              label="Create New Addon Group"
              onClick={() => goTo('/addon_groups/new/')}
              primary
            />
          </ToolbarGroup>
        </Toolbar>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Browser Version</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {this.renderRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default containAddonGroupsList(AddonGroupsList);
