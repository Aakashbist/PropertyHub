import React, { Component } from 'react';
import {
   View,
   Text,StyleSheet
} from 'react-native'

class LoginScreen extends Component{
    static navigationOptions={
        title: 'login'
    }
    render(){
        return (
            <View style={style.container}>
                <Text>Login Screen</Text>
            </View>
        );
    }
}
export default LoginScreen;

const style=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    }
})