import React, { PropTypes as pt } from 'react';
import { browserHistory, Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FetchErrorList from './stateless/FetchErrorList.jsx';
import LoadingIndicator from './stateless/LoadingIndicator.jsx';
import containAddonGroupsList from '../containers/AddonGroupsListContainer';


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

  static goto(url) {
    browserHistory.push(url);
  }

  componentWillMount() {
    this.props.fetchAddonGroups();
  }

  renderRows(addonGroups) {
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
            onClick={() => this.goto(`/addon_groups/${addonGroup.id}/`)}
            label="Edit"
            style={style.button}
          />
        </TableRowColumn>
      </TableRow>
    );
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
              onClick={() => this.goto('/addon_groups/new/')}
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
            {this.renderRows(addonGroups)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default containAddonGroupsList(AddonGroupsList);
