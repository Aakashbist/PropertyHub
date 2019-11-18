import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import styles from '../../resources/styles';

class ProfileScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/icon/profile.png')}
                style={styles.drawerIcon}
            />
        ),
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Screen</Text>
                <Button title='open drawer' onPress={() => this.props.navigation.toggleDrawer()}></Button>
            </View>
        );
    }
}
export default ProfileScreen;