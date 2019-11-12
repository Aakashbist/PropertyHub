import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';

import AppSwitchNavigator from './components/AppSwitchNavigator';


const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
