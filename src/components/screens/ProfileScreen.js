import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import styles from '../../resources/styles';
import Firebase from '../../config/Firebase';
const Profile = (props) => {
    currentAuthState =
        Firebase.auth().onAuthStateChanged((user) => {
            if (user.emailVerified) {
                return user.emailVerified;
            } else {
                return alert('error');
            }
        });



    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Text>Email  {currentAuthState}</Text>
            <Button title='open drawer' onPress={() => this.props.navigation.toggleDrawer()}></Button>
        </View>
    );
}

export default Profile;