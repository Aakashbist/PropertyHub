
import { once } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, DatePickerAndroid, TimePickerAndroid, ToastAndroid, View } from 'react-native';
import { Avatar, Icon, Image, Text } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { getCurrentUser, getCurrentUserClaims } from '../../config/Firebase';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getChatRoomId, observeChatRoomMessages, sendMessage, shouldCreateChatHistory } from '../services/ChatService';
import { getDownloadUrl, openDocumentPicker } from '../services/UploadService';

const ChatRoomScreen = (props) => {

    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState();
    const [senderId, setSenderId] = useState();
    const [userName, setUserName] = useState();
    const [attachmentDataList, setAttachmentDataList] = useState([]);
    const [observerRef, setObserverRef] = useState();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        initializeChatRoom();
        getCurrentUserClaims().then((isOwner) => {
            setOwner(isOwner);
        })
    }, []);

    setOwner = (value) => {
        setIsOwner(value);
    }
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

    openDatePicker = async () => {
        try {
            var today = moment()
            var dateAfterTwoMonth = moment(today).add(2, "months").toDate();
            console.warn('Cannot open date picker', dateAfterTwoMonth);

            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
                maxDate: dateAfterTwoMonth
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                console.log(moment([year, month, day]).format('ll'));
                openTimePicker(moment([year, month, day]));
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    openTimePicker = async (date) => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 12,
                minute: 0,
                is24Hour: false,
            });
            if (action !== TimePickerAndroid.dismissedAction && date) {
                const dateTime = date.minute(minute).hour(hour);
                const formattedDateTimeString = dateTime.format('llll');
                sendInspectionMessage(formattedDateTimeString);
            }

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    sendInspectionMessage = (dateTimeString) => {
        const message = {
            text: `Hello ! We will will be conducting property Inspection on ${dateTimeString}`,
        };
        if (chatRoomId) {
            sendMessage([message], chatRoomId).then(() => {
                navigateToChatRoom(owner);
            });
        }
    }

    const imageTypes = ["jpg", "jpeg", "png"];

    renderAccessory = () => {
        return (
            <View style={[styles.customActionsContainer, { paddingLeft: 8, paddingTop: 4, paddingBottom: 4 }]}>

                {isOwner &&
                    <View style={[styles.boxCenter, { height: 36, backgroundColor: colors.primaryDark, borderRadius: 18, marginRight: 4 }]}>
                        <Text onPress={this.openDatePicker} style={{ color: colors.darkWhite2, paddingHorizontal: 8 }} > Inspection </Text>
                    </View>
                }
                <View style={[styles.boxCenter, { width: 36, height: 36, backgroundColor: colors.primaryDark, borderRadius: 18 }]}>
                    <Icon name='paperclip'
                        type='evilicon'
                        size={26}
                        color={colors.white}
                        onPress={this.chooseDocument} />
                </View>

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
                        if (attachmentDataList.length) {
                            const attachmentUrl = [];
                            const promises = [];
                            attachmentDataList.forEach(attachment =>
                                promises.push(
                                    new Promise((resolve, reject) => {
                                        getDownloadUrl(attachment.fileUri, attachment.fileName)
                                            .then(url => {
                                                attachmentUrl.push({
                                                    url: url,
                                                    fileName: attachment.fileName,
                                                    extension: attachment.extension
                                                });
                                                resolve();
                                            }).catch(error => reject(error))
                                    })
                                )
                            )
                            Promise.all(promises).then(() => {
                                const messages = attachmentUrl.map(data => {
                                    switch (data.extension) {
                                        case "jpg":
                                        case "jpeg":
                                        case "png":
                                            return {
                                                image: data.url,
                                                text: data.fileName
                                            }
                                        default:
                                            return {
                                                text: data.url
                                            }
                                    }
                                })
                                sendMessage(messages, chatRoomId);
                                setAttachmentDataList([]);
                            })
                        } else {
                            sendMessage(newMessages, chatRoomId)
                        }

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
