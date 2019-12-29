import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import AppSwitchNavigator from './src/components/AppSwitchNavigator';
import { ThemeProvider } from 'react-native-elements';

const theme = {
  colors: {
    primary: 'pink',
    secondary: 'black'
  },
}

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <ThemeProvider theme={theme} >
        <AppContainer />
      </ThemeProvider>
    );
  }
}
