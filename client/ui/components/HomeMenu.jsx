import React, { PropTypes as pt } from 'react';

import Avatar from 'material-ui/Avatar';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { List, ListItem } from 'material-ui/List';
import goTo from '../utils/goTo';


function MenuItem({ text, linkTo, icon }) {
  return (
    <ListItem
      onClick={() => goTo(linkTo)}
      primaryText={text}
      leftAvatar={<Avatar icon={icon} />}
      rightIcon={<NavigationChevronRight />}
    />
  );
}

MenuItem.propTypes = {
  text: pt.string.isRequired,
  linkTo: pt.string.isRequired,
  icon: pt.node.isRequired,
};


class HomeMenu extends React.Component {
  static propTypes = {
    items: pt.array.isRequired,
  };

  static renderItems(items) {
    return items.map((item, index) => (
      <MenuItem
        text={item.text}
        linkTo={item.linkTo}
        icon={item.icon}
        key={index}
      />
    ));
  }

  render() {
    const { items } = this.props;

    return (
      <List>
        {HomeMenu.renderItems(items)}
      </List>
    );
  }
}

export default HomeMenu;
