import Firebase from '../../config/Firebase';
import firebase from 'firebase'
import moment from 'moment'


export function getChatRoomId(senderId, receiverId) {
    const chatRoomId = [];
    chatRoomId.push(senderId);
    chatRoomId.push(receiverId);
    chatRoomId.sort();
    return chatRoomId.join('_');
}

export function loadMessages(chatRoomId, callback) {
    messagesRef = Firebase.database().ref('chat' + '/' + chatRoomId);
    messagesRef.off();
    const onResponse = (data) => {
        const message = data.val();
        console.log(JSON.stringify(message))
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
export function sendMessage(message, chatRoomId) {
    messagesRef = Firebase.database().ref('chat' + '/' + chatRoomId)
    for (let i = 0; i < message.length; i++) {
        messagesRef.push({
            text: message[i].text,
            user: message[i].user,
            createdAt: - 1 * moment().valueOf(),
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
        });
    }
}
// close the connection to the Backend
export function closeChat() {
    if (messagesRef) {
        messagesRef.off();
    }
}



