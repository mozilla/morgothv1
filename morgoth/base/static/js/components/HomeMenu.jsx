import React, { PropTypes as pt } from 'react';
import { browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { List, ListItem } from 'material-ui/List';


class MenuItem extends React.Component {
  goto(path) {
    browserHistory.push(path);
  }

  render() {
    const { text, linkTo, icon } = this.props;
    
    return (
      <ListItem
        onClick={() => this.goto(linkTo)}
        primaryText={text}
        leftAvatar={<Avatar icon={icon} />}
        rightIcon={<NavigationChevronRight />}
      />
    );
  }
}

MenuItem.propTypes = {
  text: pt.string.isRequired,
  linkTo: pt.string.isRequired,
  icon: pt.node.isRequired
};

class HomeMenu extends React.Component {
  renderItems(items) {
    return items.map((item, index) => {
      return (
        <MenuItem 
          text={item.text} 
          linkTo={item.linkTo} 
          icon={item.icon} 
          key={index} 
        />
      );
    });
  }
  
  render() {
    const { items } = this.props;
    
    return (
      <List>
        {this.renderItems(items)}
      </List>
    );
  }
}

HomeMenu.propTypes = {
  items: pt.array.isRequired
};

export default HomeMenu;
