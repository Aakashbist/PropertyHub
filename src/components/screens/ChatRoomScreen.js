
import { once } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, ToastAndroid } from 'react-native';
import { once } from 'lodash';
import moment from 'moment';
import { Text, TouchableOpacity, Icon, Image, Avatar } from 'react-native-elements';
import { GiftedChat, Composer, Send, Bubble, MessageImage } from 'react-native-gifted-chat';
import { Firebase, getCurrentUser } from '../../config/Firebase';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getChatRoomId, loadMessages, sendMessage, shouldCreateChatHistory, observeChatRoomMessages } from '../services/ChatService';
import { getDownloadUrl, openDocumentPicker } from '../services/UploadService';

const ChatRoomScreen = (props) => {

    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState();
    const [senderId, setSenderId] = useState();
    const [userName, setUserName] = useState();
    const [customText, setCustomText] = useState('');
    const [imageUri, setImageUri] = useState();
    const [fileType, setFileType] = useState([]);
    const [observerRef, setObserverRef] = useState();

    useEffect(() => {
        initializeChatRoom();
    }, []);

    setNewMessages = (newMessages) => {
        var messages = newMessages.sort((a, b) => b.createdAt - a.createdAt);
        console.log(messages);
        setMessages(messages);
    };

    initializeChatRoom = () => {
        let senderId, receiverId, userName, roomId;
        const user = getCurrentUser();
        if (user !== null) {
            senderId = user.uid;
            userName = user.displayName;
        }
        receiverId = props.navigation.getParam('key');
        roomId = getChatRoomId(senderId, receiverId);
        setChatRoomId(roomId);
        setUserName(userName);
        setSenderId(senderId);

        const observerRef = observeChatRoomMessages(roomId, (messages) => {
            setNewMessages(messages);
        });
        setObserverRef(observerRef);
    };

    // once to check and create chat only once
    createHistory = () => {
        const receiverId = props.navigation.getParam('key');
        shouldCreateChatHistory(senderId, receiverId)
    };
    const initiateChat = once(createHistory);

    loadMoreMessage = () => {
        ToastAndroid.show('Feature Coming Soon !', ToastAndroid.SHORT);
    }
    getDocumentExtension = (fileName) => {
        var i = fileName.lastIndexOf('.');
        return (i < 0) ? '' : fileName.substr(i + 1);
    }

    chooseDocument = () => {
        openDocumentPicker().then(res => {
            const attachmentData = res.map(res => {
                return {
                    extension: getDocumentExtension(res.name),
                    fileUri: res.uri,
                    fileName: res.name
                }
            });
            setAttachmentDataList(attachmentData);
        })
    }

    const imageTypes = ["jpg", "jpeg", "png"];

    renderAccessory = () => {
        return (
            <View style={styles.customActionsContainer}>
                <Icon name='paperclip' type='evilicon' size={36} color={colors.primaryDark} onPress={this.chooseDocument} />

                {
                    attachmentDataList.filter(attachment => imageTypes.includes(attachment.extension))
                        .map(attachment => <Image source={{ uri: attachment.fileUri }}
                            PlaceholderContent={<ActivityIndicator />}
                            containerStyle={{ backgroundColor: colors.darkWhite2 }}
                            style={{ width: 50, height: 50, resizeMode: 'contain' }} />)}
                {
                    attachmentDataList.filter(attachment => !imageTypes.includes(attachment.extension))
                        .map(attachment => <Avatar
                            size="small"
                            containerStyle={{ width: 50, height: 50 }}
                            title={attachment.extension}
                            activeOpacity={0.7}
                        />)
                }

            </View>
        );
    }

    onLongPress = (context, message) => {
        console.log(context, message);
        const options = ['Delete Message', 'Copy Message', 'Cancel'];

        const cancelButtonIndex = options.length - 1;
        context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    deleteChatWithId(chatRoomId, message._id);
                    break;
                case 1:
                    break;
                case 2:
                    break;

            }
        });
    }

    return (
        <View style={styles.containerFull}>
            <View style={styles.chatContainer}>
                <GiftedChat
                    onLongPress={this.onLongPress}
                    showUserAvatar={true}
                    alwaysShowSend={attachmentDataList.length > 0 ? true : false}
                    renderAccessory={this.renderAccessory}
                    messages={messages}
                    loadEarlier={true}
                    onLoadEarlier={() => this.loadMoreMessage()}
                    onQuickReply={(replies) => {
                        const messages = replies.map(reply => {
                            return {
                                text: reply.title
                            };
                        })
                        console.log(messages, "hhh");
                        sendMessage(messages, chatRoomId);
                    }}
                    onSend={(newMessages) => {
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