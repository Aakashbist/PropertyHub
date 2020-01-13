import React, { useEffect, useState } from 'react';
import styles from '../../resources/styles';
import { ScrollView, View } from 'react-native';
import { Header, icon, Text, Button, Icon } from 'react-native-elements';
import colors from '../../resources/colors';
import Firebase from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';

const ChatScreen = (props) => {
    navigateToChatRoom = () => {
        const user = Firebase.auth().currentUser;
        if (user.uid === "5UjrK6Yki9d2uDK440W4XMR1Mlz1") {
            props.navigation.navigate(AppRoute.ChatRoom, { key: 'I5vdiDnW71XEZmAdByDB0Xsj3rj1' })
        }
        else {
            props.navigation.navigate(AppRoute.ChatRoom, { key: '5UjrK6Yki9d2uDK440W4XMR1Mlz1' })
        }
    }

    return (
        <ScrollView>
            <View style={styles.containerFull} >
                <Button title='chat' onPress={() => navigateToChatRoom()}></Button>
            </View>
        </ScrollView>
    );
}

ChatScreen.navigationOptions = (props) => ({
    title: 'Property Hub Chat',
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerLeft: () => (
        <Icon
            name='menu'
            type='entypo'
            color={colors.white}
            onPress={() => props.navigation.toggleDrawer()} />
    ),
    headerLeftContainerStyle: {
        marginHorizontal: 16
    }
});

export default ChatScreen;