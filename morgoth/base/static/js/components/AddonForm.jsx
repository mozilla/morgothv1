import React, { PropTypes as pt } from 'react';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';

import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import FetchErrorList from './stateless/FetchErrorList.jsx';
import LoadingIndicator from './stateless/LoadingIndicator.jsx';


class AddonForm extends React.Component {
  static propTypes = {
    activeAddon: pt.object,
    fetchAddon: pt.func.isRequired,
    fields: pt.object.isRequired,
    onSubmit: pt.func,
    pk: pt.any,
  }

  componentWillMount() {
    const { fetchAddon, pk } = this.props;
    if (pk) {
      fetchAddon();
    }
  }

  goto(url) {
    browserHistory.push(url);
  }

  render() {
    const { fields, activeAddon, onSubmit } = this.props;

    if (activeAddon.loading) {
      return (
        <div className="wrapper align-center">
          <LoadingIndicator />
        </div>
      );
    }

    if (activeAddon.error) {
      return (
        <div className="wrapper align-center">
          <FetchErrorList errors={activeAddon.error} />
        </div>
      );
    }

    return (
      <form onSubmit={onSubmit}>
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={() => this.goto('/addons/')}
              label="Back to Addon List"
              icon={<NavigationChevronLeft />}
            />
          </ToolbarGroup>
        </Toolbar>
        <div className="wrapper">
          <div>
            <TextField ref="inputName" floatingLabelText="Name" {...fields.name} />
          </div>
          <div>
            <TextField floatingLabelText="Version" {...fields.version} />
          </div>
          <div>
            <TextField floatingLabelText="FTP URL" {...fields.ftp_url} fullWidth />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'addon',
  fields: ['name', 'version', 'ftp_url'],
})(AddonForm);
