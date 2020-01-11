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
            if (user) {
                user.getIdTokenResult().then((token) => {
                    if (user && user.emailVerified) {
                        console.log(token.claims, 'AuthLoading')
                        this.props.navigation.navigate(token.claims.isOwner ? AppRoute.Owner : AppRoute.Tenant);
                    } else {
                        this.props.navigation.navigate(AppRoute.Auth)
                    }
                }).catch((error) => console.error(error.message))
            } else {
                this.props.navigation.navigate(AppRoute.Auth)
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/icon/homeIcon.png')}
                    style={{ width: 400, height: 400 }}
                />
                <ActivityIndicator style={{ marginTop: 30 }} />
            </View>
        );
    }
}