import React, { PropTypes as pt } from 'react';

import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


const style = {
  addonChip: {
    marginRight: '5px',
  },
  addonChips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class AddonSelectField extends React.Component {
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
        items.push((
          <MenuItem
            key={addon.id}
            value={addon.id}
            primaryText={addon.name}
            secondaryText={`v${addon.version}`}
          />
        ));
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

        if (addon) {
          items.push((
            <Chip
              key={addonId}
              style={style.addonChip}
              onRequestDelete={() => this.handleRequestDelete(addonId)}
            >
              <strong>{addon.name}</strong> v{addon.version}
            </Chip>
          ));
        }
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

export default AddonSelectField;
