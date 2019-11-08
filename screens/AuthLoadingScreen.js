import React, { Component } from 'react';
import { ActivityIndicator, View, StatusBar, StyleSheet, Image } from 'react-native';
import Firebase from '../config/Firebase';

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.currentAuthState();
    }
    currentAuthState = () => {
        Firebase.auth().onAuthStateChanged((user) =>
            this.props.navigation.navigate(user ? 'App' : 'Auth')
        )
    };

    render() {
        return (
            <View style={style.container}>
                <Image
                    source={require('../assets/icon/homeIcon.png')}
                    style={{ width: 400, height: 400 }}
                />
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});