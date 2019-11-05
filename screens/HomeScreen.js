import React, { Component } from 'react';
import { View,Text,StyleSheet,Button,TouchableOpacity} from 'react-native'

class HomeScreen extends Component{
    static navigationOptions=({navigation})=>({
        title: 'HOME',
        headerRight:<TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')} >
            <Text style={{margin:10,padding:10}}>Login</Text>
        </TouchableOpacity>
    })
    render(){
        return (
            <View style={style.container}>
                <Text>Home Screen</Text>
               
            </View>
        );
    }
}
export default HomeScreen;

const style=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    }
})