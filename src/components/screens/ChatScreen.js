
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text } from 'native-base';

const ChatScreen = (props) => {

    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: { _id: 2, name: 'Name' },
        },
    ]);

    const onSend = (newMessage = []) => {
        setMessages(GiftedChat.append(messages, newMessage));
        alert(JSON.stringify(messages))
    };
    return (
        <ScrollView>
            <SafeAreaView >
                <View style={styles.containerFull}>
                    <Header
                        barStyle="light-content"
                        style={{ height: 150 }}
                        backgroundColor={colors.blue}
                        placement="left"
                        leftComponent={{ icon: 'menu', color: colors.white, onPress: () => props.navigation.toggleDrawer() }}
                        centerComponent={{ text: 'Chats', style: { fontSize: 20, color: colors.white } }}
                        statusBarProps={{ translucent: true }}
                    />

                    <View style={styles.chatContainer}>
                        <GiftedChat
                            messages={messages}
                            onSend={newMessage => onSend(newMessage)}
                            user={{
                                _id: 1,
                            }}
                        />
                    </View>

                </View>
            </SafeAreaView >
        </ScrollView>
    );
}



export default ChatScreen;