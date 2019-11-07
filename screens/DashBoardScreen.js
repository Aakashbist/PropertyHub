import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class DashBoardScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ }) => (
      <Image
        source={require('../assets/icon/dashboard-24px.svg')}
        style={[style.icon]}
      />
    ),
  };
  render() {
    return (
      <View style={style.container}>

        <Text>DashBoard Screen</Text>
        <Button title='open drawer' onPress={() => this.props.navigation.toggleDrawer()}></Button>
        <Button title='Logout' onPress={this._asyncLogout}></Button>

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
    width: 50,
    height: 50,
    backgroundColor: 'black'

  }
});
