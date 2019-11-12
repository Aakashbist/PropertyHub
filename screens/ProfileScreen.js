import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

class ProfileScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../assets/icon/profile.png')}
                style={[style.icon]}
            />
        ),
    };
    render() {
        return (
            <View style={style.container}>
                <Text>Profile Screen</Text>
            </View>
        );
    }
}
export default ProfileScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 30,
        height: 30
    }
});
