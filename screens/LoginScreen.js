import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class LoginScreen extends Component {
  static navigationOptions = {
    title: 'login',
  };
  render() {
    return (
      <View style={style.container}>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerNavigator')}> */}
        <TouchableOpacity onPress={this._asyncLogin}>
          <Text>Authenticate</Text>
        </TouchableOpacity>
      </View >
    );
  }
  _asyncLogin = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}
export default LoginScreen;



const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
