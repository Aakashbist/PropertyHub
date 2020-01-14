import Firebase from '../../config/Firebase';
import firebase from 'firebase'
import moment from 'moment'
import { mapToArray } from '../../utils/firebaseArray';

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
    console.log(aa);
    messagesRef.off();
    const onResponse = (data) => {
        const message = data.val();
        callback({
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.timeStamp),
            user: {
                _id: message.user._id,
                name: message.user.name,
            },
        });
    }
    messagesRef.orderByChild('timeStamp').limitToLast(50).on('child_added', onResponse);
}

// send the message to the Backend
export function sendMessage(message, chatRoomId, senderId, receiverId) {
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


export function shouldCreateChatHistory(senderId, receiverId) {
    //check for id before pushing
    getChatHistoryById(senderId).then(data => {
        data.forEach(element => {
            if (element.chatee === receiverId) {
                return;
            }
            else {
                const senderRef = Firebase.database().ref(`${chatHistoryCollection}/${senderId}/`);
                senderRef.push({ chatee: receiverId })
                const receiverRef = Firebase.database().ref(`${chatHistoryCollection}/${receiverId}/`);
                receiverRef.push({ chatee: senderId })
            }
        });
    })
}

// close the connection to the Backend
export function closeChat() {
    if (messagesRef) {
        messagesRef.off();
    }
}



