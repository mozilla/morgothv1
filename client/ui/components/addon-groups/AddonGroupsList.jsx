import React, { PropTypes as pt } from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FetchErrorList from './../error/FetchErrorList';
import LoadingIndicator from '../indicators/LoadingIndicator';
import containAddonGroupsList from '../../containers/AddonGroupsListContainer';
import goTo from '../../utils/goTo';


const style = {
  button: {
    float: 'right',
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
  group: {
    flex: '1',
  },
};

class AddonGroupsList extends React.Component {
  static propTypes = {
    addonGroups: pt.array,
    count: pt.number,
    page: pt.number,
    pageSize: pt.number,
    request: pt.object,
  };

  renderRows() {
    const { addonGroups } = this.props;

    return addonGroups.map((addonGroup, index) => (
      <TableRow key={index}>
        <TableRowColumn className="version">
          <Link to={`/addon_groups/${addonGroup.id}/`}>{addonGroup.browser_version}</Link>
        </TableRowColumn>
        <TableRowColumn />
        <TableRowColumn>
          {addonGroup.addons.map(addon => <div key={addon.id}>{addon.name}</div>)}
        </TableRowColumn>
        <TableRowColumn />
        <TableRowColumn />
        <TableRowColumn className="align-right">
          <RaisedButton
            onClick={() => goTo(`/addon_groups/${addonGroup.id}/`)}
            label="Edit"
            style={style.button}
          />
        </TableRowColumn>
      </TableRow>
    ));
  }

  renderPagination() {
    const { count, page, pageSize } = this.props;

    if (page * pageSize >= count) {
      return null;
    }

    return (
      <Toolbar style={style.toolbar}>
        {(
          page ?
            <ToolbarGroup style={style.group} firstChild>
              <RaisedButton
                label="Previous"
                onClick={() => goTo(`/addon_groups/?page=${page - 1}`)}
                primary
              />
            </ToolbarGroup> :
            null
        )}
        {(
          page < (count / pageSize) - 1 ?
            <ToolbarGroup className="align-right" lastChild>
              <RaisedButton
                className="align-right"
                label="Next"
                onClick={() => goTo(`/addon_groups/?page=${page + 1}`)}
                primary
              />
            </ToolbarGroup> :
            null
        )}
      </Toolbar>
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
        <Table className="addon-group-list" selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Browser Version</TableHeaderColumn>
              <TableHeaderColumn>Built-In Addons</TableHeaderColumn>
              <TableHeaderColumn>Shipping</TableHeaderColumn>
              <TableHeaderColumn>Current Balrog QA</TableHeaderColumn>
              <TableHeaderColumn>Current Balrog Release</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {this.renderRows()}
          </TableBody>
        </Table>
        {this.renderPagination()}
      </div>
    );
  }
}

export default containAddonGroupsList(AddonGroupsList);
