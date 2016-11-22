import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import QueryAddon from '../data/QueryAddon';
import ErrorSnackbar from '../error/ErrorSnackbar';
import FetchErrorList from '../error/FetchErrorList';
import LoadingIndicator from '../indicators/LoadingIndicator';
import containAddonDetails from '../../containers/AddonDetailsContainer';
import goTo from '../../utils/goTo';


const style = {
  toolbar: {
    justifyContent: 'flex-end',
  },
};

class AddonForm extends React.Component {
  static propTypes = {
    addon: pt.object,
    fetchRequest: pt.object,
    handleSubmit: pt.func.isRequired,
    initialize: pt.func.isRequired,
    initialValues: pt.object,
    pk: pt.string,
    saveAddon: pt.func.isRequired,
    saveRequest: pt.object,
  }

  componentWillMount() {
    const { initialize, initialValues } = this.props;
    initialize('addon', initialValues, false);
  }

  componentWillReceiveProps(nextProps) {
    const { initialize, initialValues } = this.props;

    if (initialValues.id !== nextProps.initialValues.id) {
      initialize('addon', nextProps.initialValues, false);
    }
  }

  render() {
    const { addon, fetchRequest, handleSubmit, pk, saveAddon, saveRequest } = this.props;
    const isSaving = saveRequest.loading;
    const saveError = saveRequest.error;

    if (fetchRequest.loading) {
      return (
        <div className="wrapper align-center">
          <LoadingIndicator />
        </div>
      );
    }

    if (fetchRequest.error) {
      return (
        <div className="wrapper align-center">
          <FetchErrorList errors={fetchRequest.error} />
        </div>
      );
    }

    if (pk && !addon) {
      return <QueryAddon pk={pk} />;
    }

    return (
      <form>
        <ErrorSnackbar error={saveError} />
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={() => goTo('/addons/')}
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
            <Field
              name="name"
              floatingLabelText="Name"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="version"
              floatingLabelText="Version"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="ftp_url"
              floatingLabelText="FTP URL"
              disabled={isSaving}
              component={TextField}
            />
          </div>
        </div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(values => saveAddon(values, true))}
              label="Save & Continue"
              disabled={isSaving}
            />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(values => saveAddon(values, false))}
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

function mapStateToProps(state, { addon }) {
  return {
    initialValues: addon || null,
  };
}

const ContainedAddonForm = containAddonDetails(connect(mapStateToProps)(AddonForm));

export default reduxForm({
  form: 'addon',
})(ContainedAddonForm);
