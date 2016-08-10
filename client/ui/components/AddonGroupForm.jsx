import React, { PropTypes as pt } from 'react';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
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

class AddonGroupForm extends React.Component {
  static propTypes = {
    activeAddonGroup: pt.object.isRequired,
    createAddonGroup: pt.object.isRequired,
    fetchAddonGroup: pt.func.isRequired,
    fields: pt.array.isRequired,
    handleSave: pt.func.isRequired,
    handleSaveAndContinue: pt.func.isRequired,
    pk: pt.any,
    resetAll: pt.func.isRequired,
    updateAddonGroup: pt.object.isRequired,
    values: pt.object,
  }

  componentWillMount() {
    const { fetchAddonGroup, pk } = this.props;
    if (pk) {
      fetchAddonGroup();
    }
  }

  componentWillUnmount() {
    this.props.resetAll();
  }

  goto(url) {
    browserHistory.push(url);
  }

  render() {
    const {
      activeAddonGroup, createAddonGroup, handleSave, handleSaveAndContinue, updateAddonGroup,
      values,
    } = this.props;
    const isSaving = createAddonGroup.loading || updateAddonGroup.loading;
    const saveError = createAddonGroup.error || updateAddonGroup.error;

    if (activeAddonGroup.loading) {
      return (
        <div className="wrapper align-center">
          <LoadingIndicator />
        </div>
      );
    }

    if (activeAddonGroup.error) {
      return (
        <div className="wrapper align-center">
          <FetchErrorList errors={activeAddonGroup.error} />
        </div>
      );
    }

    return (
      <form>
        <ErrorSnackbar error={saveError} />
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={() => this.goto('/addon_groups/')}
              label="Back to Addon Group List"
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
            <Field
              name="channel_name"
              floatingLabelText="Channel Name"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="browser_version"
              floatingLabelText="Browser Version"
              disabled={isSaving}
              component={TextField}
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
  form: 'addonGroup',
  fields: ['channel_name', 'browser_version'],
})(AddonGroupForm);
