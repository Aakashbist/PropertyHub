import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Icon, Text } from 'react-native-elements';
import { getCurrentUser } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getChatHistoryById } from '../services/ChatService';
import { getUserById } from '../services/UserService';
import { getNameInitials } from '../utils/TextUtils';

const ChatScreen = (props) => {

    const [chatUsers, setChatUsers] = useState();

    useEffect(() => {
        initializeChat();
    }, []);

    initializeChat = () => {
        const user = getCurrentUser();
        var isOwner;
        user.getIdTokenResult()
            .then((token) => {
                isOwner = token.claims.isOwner;
                return getChatHistoryById(user.uid);
            })
            .then((chatees) => {
                const promises = [];
                chatees.forEach(user => {
                    promises.push(getUserById(user.chatee, isOwner));
                });
                return Promise.all(promises)
            })
            .then((values) => {
                setChatUsers(values)
            })
            .catch(error => alert(error))
    }

    let view = chatUsers == null ? <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text style={{ fontSize: 28 }}> History </Text>
        <Text style={{ fontSize: 18, marginTop: 16 }}> No Messages </Text>
    </View> :
        <React.Fragment>
            <FlatList
                style={[styles.cardContainer, {}]}
                data={chatUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View >
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', alignContent: 'center', padding: 16 }}
                            onPress={() => props.navigation.navigate(AppRoute.ChatRoom, { key: item.id, title: item.name })}>
                            <Avatar rounded
                                overlayContainerStyle={{ backgroundColor: colors.primaryDark }}
                                title={getNameInitials(item.name)} containerStyle={{ marginRight: 16 }} />
                            <Text style={[styles.textSubHeading, {
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                fontSize: 16,
                                flex: 1
                            }]}>{item.name}</Text>
                        </TouchableOpacity>
                        <Divider />
                    </View>
                )}
            />
        </React.Fragment>

    return (
        <ScrollView keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <View style={styles.containerFull} >
                {view}
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