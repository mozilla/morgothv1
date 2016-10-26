import React, { PropTypes as pt } from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FetchErrorList from './../error/FetchErrorList';
import LoadingIndicator from '../indicators/LoadingIndicator';
import containAddonsList from '../../containers/AddonsListContainer';
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

class AddonsList extends React.Component {
  static propTypes = {
    addons: pt.array,
    count: pt.number,
    page: pt.number,
    pageSize: pt.number,
    request: pt.object,
  };

  static renderRows(addons) {
    return addons.map((addon, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`/addons/${addon.id}/`}>{addon.name}</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/addons/${addon.id}/`}>{addon.version}</Link>
        </TableRowColumn>
        <TableRowColumn className="align-right">
          <RaisedButton
            onClick={() => goTo(`/addons/${addon.id}/`)}
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
                onClick={() => goTo(`/addons/?page=${page - 1}`)}
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
                onClick={() => goTo(`/addons/?page=${page + 1}`)}
                primary
              />
            </ToolbarGroup> :
            null
        )}
      </Toolbar>
    );
  }

  renderRows() {
    const { addons } = this.props;

    return addons.map((addon, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`/addons/${addon.id}/`}>{addon.name}</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/addons/${addon.id}/`}>{addon.version}</Link>
        </TableRowColumn>
        <TableRowColumn className="align-right">
          <RaisedButton
            onClick={() => goTo(`/addons/${addon.id}/`)}
            label="Edit"
            style={style.button}
          />
        </TableRowColumn>
      </TableRow>
    ));
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
              label="Create New Addon"
              onClick={() => goTo('/addons/new/')}
              primary
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
            {this.renderRows()}
          </TableBody>
        </Table>
        {this.renderPagination()}
      </div>
    );
  }
}

export default containAddonsList(AddonsList);
