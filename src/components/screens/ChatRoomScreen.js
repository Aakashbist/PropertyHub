
import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { once } from 'lodash';
import { Header } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../../config/Firebase';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getChatRoomId, loadMessages, sendMessage, shouldCreateChatHistory } from '../services/ChatService';

const ChatRoomScreen = (props) => {

    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState();
    const [senderId, setSenderId] = useState();
    const [userName, setUserName] = useState();

    useEffect(() => {
        initializeChatRoom();
    }, [])

    getMessages = (chatRoomId) => {
        loadMessages(chatRoomId, (message) => {
            setMessages(
                previous => GiftedChat.append(previous, message)
            )
        });
    }

    initializeChatRoom = () => {
        let senderId, receiverId, userName, roomId;
        const user = Firebase.auth().currentUser;
        if (user !== null) {
            senderId = user.uid;
            userName = user.displayName;
        }
        receiverId = props.navigation.getParam('key');
        roomId = getChatRoomId(senderId, receiverId);
        setChatRoomId(roomId);
        setUserName(userName);
        setSenderId(senderId);
        getMessages(roomId);
    }

    createHistory = () => {
        const receiverId = props.navigation.getParam('key');
        shouldCreateChatHistory(senderId, receiverId)
    }

    const initiateChat = once(createHistory)

    loadMoreMessage = () => {
        loadMessages(chatRoomId, (message) => {
            setMessages(
                previous => GiftedChat.append(previous, message)
            )
        });
    }

    return (
        <View style={styles.containerFull}>

            <View style={styles.chatContainer}>
                <GiftedChat
                    showUserAvatar={true}
                    messages={messages}
                    onSend={(newMessage) => {
                        initiateChat();
                        sendMessage(newMessage, chatRoomId)
                    }}
                    user={{
                        _id: senderId,
                        name: userName,
                    }}
                />
            </View>
        </View>

    );
}

ChatRoomScreen.navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,

});

export default ChatRoomScreen;