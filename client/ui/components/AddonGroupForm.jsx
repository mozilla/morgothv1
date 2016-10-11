import React, { Component, PropTypes as pt } from 'react';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import ErrorSnackbar from './stateless/ErrorSnackbar';
import FetchErrorList from './stateless/FetchErrorList';
import LoadingIndicator from './stateless/LoadingIndicator';
import containAddonGroupDetails from '../containers/AddonGroupDetailsContainer';


const style = {
  addonChip: {
    marginRight: '5px',
  },
  addonChips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class AddonSelectField extends Component {
  static propTypes = {
    addons: pt.array.isRequired,
    floatingLabelText: pt.string.isRequired,
    input: pt.object.isRequired,
    name: pt.string.isRequired,
  };

  constructor() {
    super();

    // Bind `this` to event handlers and render functions
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.renderAddonChips = this.renderAddonChips.bind(this);
    this.renderAddonItems = this.renderAddonItems.bind(this);
  }

  handleChange(event, index, addonId) {
    const { onChange, value } = this.props.input;
    onChange([...value, addonId]);
  }

  handleRequestDelete(addonId) {
    const { onChange, value } = this.props.input;
    onChange(value.filter(v => v !== addonId));
  }

  renderAddonItems() {
    const { addons, input } = this.props;
    const items = [];

    addons.forEach(addon => {
      if (input.value.indexOf(addon.id) === -1) {
        items.push(
          <MenuItem
            key={addon.id}
            value={addon.id}
            primaryText={addon.name}
            secondaryText={`v${addon.version}`}
          />
        );
      }
    });

    return items;
  }

  renderAddonChips() {
    const { addons, input } = this.props;
    const items = [];

    if (input.value) {
      input.value.forEach(addonId => {
        const addon = addons.find(a => a.id === addonId);

        items.push(
          <Chip
            key={addonId}
            style={style.addonChip}
            onRequestDelete={() => this.handleRequestDelete(addonId)}
          >
            <strong>{addon.name}</strong> v{addon.version}
          </Chip>
        );
      });
    }

    return items;
  }

  render() {
    const { name, floatingLabelText } = this.props;

    return (
      <div>
        <SelectField
          name={name}
          floatingLabelText={floatingLabelText}
          onChange={this.handleChange}
        >
          {this.renderAddonItems()}
        </SelectField>
        <div style={style.addonChips}>
          {this.renderAddonChips()}
        </div>
      </div>
    );
  }
}

class AddonGroupForm extends React.Component {
  static propTypes = {
    activeAddonGroup: pt.object.isRequired,
    addonsList: pt.object.isRequired,
    createAddonGroup: pt.object.isRequired,
    fetchAddonGroup: pt.func.isRequired,
    fetchAddons: pt.func.isRequired,
    handleSubmit: pt.func.isRequired,
    pk: pt.any,
    resetAll: pt.func.isRequired,
    save: pt.func.isRequired,
    saveAndContinue: pt.func.isRequired,
    syncAddonGroup: pt.func.isRequired,
    updateAddonGroup: pt.object.isRequired,
    values: pt.object,
  }

  static goto(url) {
    browserHistory.push(url);
  }

  componentWillMount() {
    const { fetchAddonGroup, fetchAddons, pk } = this.props;

    fetchAddons();

    if (pk) {
      fetchAddonGroup();
    }
  }

  componentWillUnmount() {
    this.props.resetAll();
  }

  render() {
    const {
      activeAddonGroup, addonsList, createAddonGroup, handleSubmit, pk, save, saveAndContinue,
      syncAddonGroup, updateAddonGroup,
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
              onClick={() => AddonGroupForm.goto('/addon_groups/')}
              label="Back to Addon Group List"
              icon={<NavigationChevronLeft />}
              disabled={isSaving}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={syncAddonGroup}
              label="Sync"
              disabled={!pk}
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
          <div>
            <Field
              name="no_update_version"
              floatingLabelText="No-Update Version"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="addons"
              floatingLabelText="Addons"
              addons={addonsList.addons}
              component={AddonSelectField}
            />
          </div>
        </div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(saveAndContinue)}
              label="Save & Continue"
              disabled={isSaving}
            />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(save)}
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

const ContainedAddonGroupForm = containAddonGroupDetails(AddonGroupForm);

export default reduxForm({
  form: 'addonGroup',
})(ContainedAddonGroupForm);
