import React, { Component } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import Firebase from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import styles from '../../resources/styles';

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.currentAuthState();
    }

    currentAuthState = () => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                this.props.navigation.navigate(AppRoute.App)
            }
            else {
                this.props.navigation.navigate(AppRoute.Auth)
            }
        }

        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/icon/homeIcon.png')}
                    style={{ width: 400, height: 400 }}
                />
                <ActivityIndicator />
            </View>
        );
    }
}