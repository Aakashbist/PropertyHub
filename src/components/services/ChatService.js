import Firebase from '../../config/Firebase';
import firebase from 'firebase'
import moment from 'moment'
import { mapToArray } from '../../utils/firebaseArray';
import { getDownloadUrl } from './UploadService';

const chatCollection = 'chat';
const chatHistoryCollection = 'chatHistory';

export function getChatRoomId(senderId, receiverId) {
    const chatRoomId = [];
    chatRoomId.push(senderId);
    chatRoomId.push(receiverId);
    chatRoomId.sort();
    return chatRoomId.join('_');
}

export function loadMessages(chatRoomId, callback) {
    messagesRef = Firebase.database().ref(`${chatCollection}/${chatRoomId}`);
    var aa = messagesRef.toString()
    messagesRef.off();
    const onResponse = (data) => {
        const message = data.val();
        callback({
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.timeStamp),
            image: message.image,
            user: {
                _id: message.user._id,
                name: message.user.name,
            },
        });
    }
    messagesRef.orderByChild('timeStamp').limitToLast(50).on('child_added', onResponse);
}

// send the message to the Backend
export function sendMessage(message, chatRoomId) {
    messagesRef = Firebase.database().ref(`${chatCollection}/${chatRoomId}`)
    for (let i = 0; i < message.length; i++) {
        messagesRef.push({
            text: message[i].text,
            user: message[i].user,
            createdAt: - 1 * moment().valueOf(),
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
        });
    }

}

export function sendMultipleMessage(message, attachmentList, chatRoomId) {
    console.log(attachmentList, "log");
    console.log(attachmentList.fileUri, attachmentList.fileName, "log")
    const attachmentDownloadUrl = attachmentList.map(attachment =>
        getDownloadUrl(attachment.fileUri, attachment.fileName)
            .then(url => {
                console.log(url)
                return {
                    url: url, fileName: attachmentList.fileName
                }
            }
            ))
    console.log(attachmentDownloadUrl);
    messagesRef = Firebase.database().ref(`${chatCollection}/${chatRoomId}`)
    for (let i = 0; i < attachmentList.length; i++) {
        for (let i = 0; i < message.length; i++) {
            messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: - 1 * moment().valueOf(),
                timeStamp: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }
}

export function createChat(senderId, receiverId) {
    const senderRef = Firebase.database().ref(`${chatHistoryCollection}/${senderId}/`);
    senderRef.push({ chatee: receiverId });
    const receiverRef = Firebase.database().ref(`${chatHistoryCollection}/${receiverId}/`);
    receiverRef.push({ chatee: senderId });
}

export function getChatHistoryById(userId) {
    return new Promise((resolve, reject) => {
        const ref = Firebase.database().ref(`${chatHistoryCollection}/${userId}`);
        ref.once("value", (dataSnapshot) => {
            const data = dataSnapshot.val()
            if (data) {
                let result = mapToArray(data)
                resolve(result)
            }
            else {
                resolve([]);
            }
        }, error => reject(error))
    })
}

export function deleteChatWithId(chatRoomId, chatId) {
    let chatRef = Firebase.database().ref(`${chatCollection}/${chatRoomId}/${chatId}`);
    return new Promise((resolve, reject) => {
        return chatRef.remove()
            .then(resolve())
            .catch(error => reject(error))
    })
}

export function shouldCreateChatHistory(senderId, receiverId) {
    let promises = [];
    getChatHistoryById(senderId).then(data => {
        const found = data.find(element => element.chatee === receiverId)
        if (!found) {
            promises.push(addChateeForUser(senderId, receiverId))
        }
    });
    getChatHistoryById(receiverId).then(data => {
        const found = data.find(element => element.chatee === senderId)
        if (!found) {
            promises.push(addChateeForUser(receiverId, senderId))
        }
    });
    return Promise.all(promises);
}

function addChateeForUser(userId, chateeId) {
    return new Promise((resolve, reject) => {
        const senderRef = Firebase.database().ref(`${chatHistoryCollection}/${userId}/`);
        senderRef.push({ chatee: chateeId }, data => resolve(data))
    })

}

// close the connection to the Backend
export function closeChat() {
    if (messagesRef) {
        messagesRef.off();
    }
}



