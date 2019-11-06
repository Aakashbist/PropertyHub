import React, { Component } from 'react';
import {
   View,
   Text,StyleSheet,TouchableOpacity
} from 'react-native'
import { Button } from 'native-base';

class LoginScreen extends Component{
    static navigationOptions={
        title: 'login'
    }
    render(){
        return (
            <View style={style.container}>
                <Text>Login Screen</Text>
                <Button onPress={()=>this.props.navigation.navigate('DrawerNavigator')} >
            <Text>Login</Text>
        </Button>
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