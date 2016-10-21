import React, { Component, PropTypes as pt } from 'react';
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

import QueryAddonGroup from './data/QueryAddonGroup';
import ErrorSnackbar from './stateless/ErrorSnackbar';
import FetchErrorList from './stateless/FetchErrorList';
import LoadingIndicator from './stateless/LoadingIndicator';
import containAddonGroupDetails from '../containers/AddonGroupDetailsContainer';
import goTo from '../utils/goTo';


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
    addonGroup: pt.object,
    addons: pt.array,
    fetchRequest: pt.object,
    handleSubmit: pt.func.isRequired,
    initialize: pt.func.isRequired,
    initialValues: pt.object,
    pk: pt.string,
    saveAddonGroup: pt.func.isRequired,
    saveRequest: pt.object,
    syncAddonGroup: pt.func.isRequired,
  }

  componentWillMount() {
    const { initialize, initialValues } = this.props;
    initialize('addonGroup', initialValues, false);
  }

  componentWillReceiveProps(nextProps) {
    const { initialize, initialValues } = this.props;

    if (initialValues !== nextProps.initialValues) {
      initialize('addonGroup', nextProps.initialValues, false);
    }
  }

  render() {
    const {
      addonGroup, addons, fetchRequest, handleSubmit, saveAddonGroup, saveRequest, pk,
      syncAddonGroup,
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

    if (!addonGroup) {
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

const ContainedAddonGroupForm = containAddonGroupDetails(AddonGroupForm);

export default reduxForm({
  form: 'addonGroup',
})(ContainedAddonGroupForm);
