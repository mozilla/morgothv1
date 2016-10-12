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
    addonGroupsList: pt.object.isRequired,
    fetchAddonGroups: pt.func.isRequired,
  };

  static renderRows(addonGroups) {
    return addonGroups.map((addonGroup, index) =>
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`/addon_groups/${addonGroup.id}/`}>{addonGroup.channel_name}</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/addon_groups/${addonGroup.id}/`}>{addonGroup.browser_version}</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/addon_groups/${addonGroup.id}/`}>{addonGroup.no_update_version}</Link>
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

  componentWillMount() {
    this.props.fetchAddonGroups();
  }

  render() {
    const { addonGroups, error, loading } = this.props.addonGroupsList;

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
              <TableHeaderColumn>Channel Name</TableHeaderColumn>
              <TableHeaderColumn>Browser Version</TableHeaderColumn>
              <TableHeaderColumn>No-Update Version</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {AddonGroupsList.renderRows(addonGroups)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default containAddonGroupsList(AddonGroupsList);
