import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../../resources/styles';
import { Icon } from 'react-native-elements';

class DashboardScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ }) => (
      <Icon name='th'
        type='font-awesome'
        style={styles.drawerIcon}
      />
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
