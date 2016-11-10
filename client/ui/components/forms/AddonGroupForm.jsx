import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import AddonSelectField from './fields/AddonSelectField';
import QueryAddonGroup from '../data/QueryAddonGroup';
import ErrorSnackbar from '../error/ErrorSnackbar';
import FetchErrorList from '../error/FetchErrorList';
import LoadingIndicator from '../indicators/LoadingIndicator';
import containAddonGroupDetails from '../../containers/AddonGroupDetailsContainer';
import goTo from '../../utils/goTo';

const style = {
  toolbar: {
    justifyContent: 'flex-end',
  },
};

class AddonGroupForm extends React.Component {
  static propTypes = {
    addonGroup: pt.object,
    addons: pt.array,
    fetchRequest: pt.object,
    handleSubmit: pt.func.isRequired,
    initialize: pt.func.isRequired,
    initialValues: pt.object,
    pk: pt.string,
    saveAddonGroup: pt.func.isRequired,
    saveRequest: pt.object,
  }

  componentWillMount() {
    const { initialize, initialValues } = this.props;
    initialize('addonGroup', initialValues, false);
  }

  componentWillReceiveProps(nextProps) {
    const { initialize, initialValues } = this.props;

    if (initialValues && initialValues.id !== nextProps.initialValues.id) {
      initialize('addonGroup', nextProps.initialValues, false);
    }
  }

  render() {
    const {
      addonGroup, addons, fetchRequest, handleSubmit, saveAddonGroup, saveRequest, pk,
    } = this.props;
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

    if (pk && !addonGroup) {
      return <QueryAddonGroup pk={pk} />;
    }

    return (
      <form>
        <ErrorSnackbar error={saveError} />
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={() => goTo('/addon_groups/')}
              label="Back to Addon Group List"
              icon={<NavigationChevronLeft />}
              disabled={isSaving}
            />
          </ToolbarGroup>s
        </Toolbar>
        {
          isSaving ?
            <LinearProgress /> : ''
        }
        <div className="wrapper">
          <div>
            <Field
              name="browser_version"
              floatingLabelText="Browser Version"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="addons"
              floatingLabelText="Addons"
              addons={addons}
              component={AddonSelectField}
            />
          </div>
        </div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(values => saveAddonGroup(values, true))}
              label="Save & Continue"
              disabled={isSaving}
            />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(values => saveAddonGroup(values, false))}
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

function mapStateToProps(state, { addonGroup }) {
  if (addonGroup) {
    return {
      initialValues: {
        ...addonGroup,
        addons: addonGroup.addons.map(addon => addon.id),
      },
    };
  }

  return {
    initialValues: {},
  };
}

const ContainedAddonGroupForm = containAddonGroupDetails(connect(mapStateToProps)(AddonGroupForm));

export default reduxForm({
  form: 'addonGroup',
})(ContainedAddonGroupForm);
