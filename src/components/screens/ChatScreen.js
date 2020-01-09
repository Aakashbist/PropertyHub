import React, { useEffect, useState } from 'react';
import styles from '../../resources/styles';
import { ScrollView, View } from 'react-native';
import { Header, icon, Text, Button } from 'react-native-elements';
import colors from '../../resources/colors';
import Firebase from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';

const ChatScreen = (props) => {
    navigateToChatRoom = () => {
        const user = Firebase.auth().currentUser;
        if (user.uid === "01htPsIsRCQSMPjjGFiJqd2e7ds1") {
            props.navigation.navigate(AppRoute.ChatRoom, { key: 'yUzFvAXwZ1WC2kjIYaRIU25FqeE3' })
        }
        else {
            props.navigation.navigate(AppRoute.ChatRoom, { key: '01htPsIsRCQSMPjjGFiJqd2e7ds1' })
        }
    }

    return (
        <ScrollView>
            <View style={styles.containerFull} >
                <Header
                    barStyle="light-content"
                    style={{ height: 150 }}
                    placement="left"
                    leftComponent={{ icon: 'menu', color: colors.white, onPress: () => props.navigation.toggleDrawer() }}
                    centerComponent={{ text: 'Chats', style: { fontSize: 20, color: colors.white } }}
                    statusBarProps={{ translucent: true }}
                />

                <Button title='chat' onPress={() => navigateToChatRoom()}></Button>
            </View>
        </ScrollView>
    );
}


export default ChatScreen;