import React, { Component } from 'react';
import {
   View,
   Text,StyleSheet
} from 'react-native'

class ProfileScreen extends Component{
    render(){
        return (
            <View style={style.container}>
                <Text>Profile Screen</Text>
            </View>
        );
    }
}
export default ProfileScreen;

const style=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    }
})