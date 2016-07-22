import React, { PropTypes as pt } from 'react';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';

import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import ErrorSnackbar from './stateless/ErrorSnackbar.jsx';
import FetchErrorList from './stateless/FetchErrorList.jsx';
import LoadingIndicator from './stateless/LoadingIndicator.jsx';


const style = {
  toolbar: {
    justifyContent: 'flex-end',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class AddonForm extends React.Component {
  static propTypes = {
    activeAddon: pt.object.isRequired,
    createAddon: pt.object.isRequired,
    fetchAddon: pt.func.isRequired,
    fields: pt.object.isRequired,
    handleSave: pt.func.isRequired,
    handleSaveAndContinue: pt.func.isRequired,
    pk: pt.any,
    updateAddon: pt.object.isRequired,
    values: pt.object,
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
    const {
      activeAddon, createAddon, fields, handleSave, handleSaveAndContinue, updateAddon, values,
    } = this.props;
    const isSaving = createAddon.loading || updateAddon.loading;
    const saveError = createAddon.error || updateAddon.error;

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
      <form>
        <ErrorSnackbar error={saveError} />
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={() => this.goto('/addons/')}
              label="Back to Addon List"
              icon={<NavigationChevronLeft />}
              disabled={isSaving}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          isSaving ?
            <LinearProgress /> : ''
        }
        <div className="wrapper">
          <div>
            <TextField
              floatingLabelText="Name"
              disabled={isSaving}
              {...fields.name}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Version"
              disabled={isSaving}
              {...fields.version}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="FTP URL"
              disabled={isSaving}
              {...fields.ftp_url}
            />
          </div>
        </div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={() => handleSaveAndContinue(values)}
              label="Save & Continue"
              disabled={isSaving}
            />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={() => handleSave(values)}
              label="Save"
              disabled={isSaving}
              primary
            />
          </ToolbarGroup>
        </Toolbar>
      </form>
    );
  }
}

export default reduxForm({
  form: 'addon',
  fields: ['name', 'version', 'ftp_url'],
})(AddonForm);
