
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { once } from 'lodash';
import { Text, TouchableOpacity, Icon, Image, Avatar } from 'react-native-elements';
import { GiftedChat, Composer, Send, Bubble, MessageImage } from 'react-native-gifted-chat';
import Firebase from '../../config/Firebase';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getChatRoomId, loadMessages, sendMessage, shouldCreateChatHistory } from '../services/ChatService';

import { getDownloadUrl, openDocumentPicker } from '../services/UploadService';

const ChatRoomScreen = (props) => {

    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState();
    const [senderId, setSenderId] = useState();
    const [userName, setUserName] = useState();
    const [customText, setCustomText] = useState('');
    const [imageUri, setImageUri] = useState();
    const [fileType, setFileType] = useState([]);

    useEffect(() => {
        initializeChatRoom();
    }, [])

    getMessages = (chatRoomId) => {
        loadMessages(chatRoomId, (message) => {
            console.log(message)
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

    renderAccessory = () => {
        return (
            <View style={styles.customActionsContainer}>
                <Icon name='paperclip' type='evilicon' size={36} color={colors.primaryDark} onPress={this.chooseDocument} />
                <Avatar
                    size="small"
                    containerStyle={{ width: 50, height: 50 }}
                    title="PDF "
                    activeOpacity={0.7}
                />
                {
                    imageUri &&
                    <Image source={{ uri: imageUri }} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                }
            </View>
        );
    }


    chooseDocument = () => {
        openDocumentPicker().then(res => {
            console.log(res);
            const fileType = []
            res.forEach(res => {
                getDownloadUrl(res.uri, res.name).then(url => {
                    setImageUri(url);
                    fileType.push(res.type);
                    console.log(url)
                })
            })
            setFileType(fileType)

        })
    }



    return (
        <View style={styles.containerFull}>

            <View style={styles.chatContainer}>

                <GiftedChat
                    image={imageUri}
                    showUserAvatar={true}
                    renderAccessory={this.renderAccessory}
                    messages={messages} onSend={(newMessage) => {
                        initiateChat();
                        sendMessage(newMessages, chatRoomId)
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