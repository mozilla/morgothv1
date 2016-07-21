import React from 'react';

import Paper from 'material-ui/Paper';
import ActionExtension from '../../../../../../node_modules/material-ui/svg-icons/action/extension';
import NavigationApps from '../../../../../../node_modules/material-ui/svg-icons/navigation/apps';

import HomeMenu from '../HomeMenu.jsx';


const MENU_ITEMS = [
  {
    text: 'Addons',
    linkTo: '/addons/',
    icon: <ActionExtension />,
  },
  {
    text: 'Addon Groups',
    linkTo: '/addon_groups/',
    icon: <NavigationApps />,
  },
];

function HomePage() {
  return (
    <Paper zDepth={2} className="page">
      <HomeMenu items={MENU_ITEMS} />
    </Paper>
  );
}

export default HomePage;
