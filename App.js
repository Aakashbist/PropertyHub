import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import AppSwitchNavigator from './src/components/AppSwitchNavigator';

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <AppContainer />;
  }
}
