import React, { PropTypes as pt } from 'react';

import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

import QueryAddons from '../../data/QueryAddons';


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

    this.state = {
      dataSource: [],
      searchText: '',
    };

    // Bind `this` to event handlers and render functions
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.renderAddonChips = this.renderAddonChips.bind(this);
    this.renderAddonItems = this.renderAddonItems.bind(this);
  }

  componentWillMount() {
    const { addons } = this.props;
    this.setState({
      dataSource: addons.map(addon => (
        { value: addon.id, text: `${addon.name} v${addon.version}` }
      )),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { addons } = this.props;
    if (addons.length !== nextProps.addons.length) {
      this.setState({
        dataSource: addons.map(addon => (
          { value: addon.id, text: `${addon.name} v${addon.version}` }
        )),
      });
    }
  }

  handleChange(text, index) {
    const { onChange, value } = this.props.input;
    const option = this.state.dataSource[index];
    if (option && !value.includes(option.value)) {
      onChange([...value, option.value]);
    }
    this.field.setState({ searchText: '' });
  }

  handleUpdateInput(value) {
    this.setState({ searchText: value });
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
    const { dataSource, searchText } = this.state;

    return (
      <div>
        <QueryAddons limit={100} offset={0} search={searchText} />
        <AutoComplete
          name={name}
          dataSource={dataSource}
          floatingLabelText={floatingLabelText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleChange}
          filter={(text, key) => text.length && key.startsWith(text)}
          ref={ref => { this.field = ref; }}
          openOnFocus
        />
        <div style={style.addonChips}>
          {this.renderAddonChips()}
        </div>
      </div>
    );
  }
}

export default AddonSelectField;
