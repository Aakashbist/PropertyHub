import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

class DashBoardScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ }) => (
      <Image
        source={require('../assets/icon/dashboard.png')}

      />
    ),
  };
  render() {
    return (
      <View style={style.container}>
        <Text>DashBoard Screen</Text>
        <Button title='open drawer' onPress={() => this.props.navigation.toggleDrawer()}></Button>

      </View >
    );
  }

  _asyncLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
export default DashBoardScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  icon: {
    width: 30,
    height: 30


  }
});
