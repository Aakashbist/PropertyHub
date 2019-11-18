import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';
import styles from '../resources/styles';

class DashboardScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ }) => (
      <Image source={require('../assets/icon/dashboard.png')} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Dashboard Screen</Text>
        <Button title='open drawer' onPress={() => this.props.navigation.toggleDrawer()}></Button>
      </View >
    );
  }
}

export default DashboardScreen;
