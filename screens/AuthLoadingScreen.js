import React, { Component } from 'react';
import { ActivityIndicator, Image, StatusBar, StyleSheet, View } from 'react-native';
import Firebase from '../config/Firebase';
import styles from '../resources/styles';
import AppRoute from '../resources/appRoute';

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.currentAuthState();
    }

    currentAuthState = () => {
        Firebase.auth().onAuthStateChanged((user) =>
            this.props.navigation.navigate(user ? AppRoute.App : AppRoute.Auth)
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/icon/homeIcon.png')}
                    style={{ width: 400, height: 400 }}
                />
                <ActivityIndicator />
            </View>
        );
    }
}