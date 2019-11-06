import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class DashBoardScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>DashBoard Screen</Text>
      </View>
    );
  }
}
export default DashBoardScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
