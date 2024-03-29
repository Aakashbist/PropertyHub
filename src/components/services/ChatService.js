import { Firebase, getCurrentUser } from '../../config/Firebase';
import firebase from 'firebase';
import moment from 'moment';
import { mapToArray } from '../utils/firebaseArray';

const chatCollection = 'chat';
const chatHistoryCollection = 'chatHistory';
const pageLength = 100;

export function getChatRoomId(senderId, receiverId) {
    const chatRoomId = [];
    chatRoomId.push(senderId);
    chatRoomId.push(receiverId);
    chatRoomId.sort();
    return chatRoomId.join('_');
}

export function observeChatRoomMessages(chatRoomId, callback) {
    const onResponse = (data) => {
        if (data && data.val()) {
            var messages = mapToArray(data.val());
            console.log(messages, "observe");
            callback(messages.sort((a, b) => b.createdAt - a.createdAt));
        } else {
            callback([]);
        }
    }
    const messagesRef = Firebase.database().ref(`${chatCollection}/${chatRoomId}`);
    messagesRef.orderByChild('createdAt')
        .limitToLast(pageLength).on('value', onResponse);
    return messagesRef;
}

// send the message to the Backend
// adding timeStamp , createdAt, user
// hence support quick replies 
export function sendMessage(messages, chatRoomId) {
    var promises = []
    const user = getCurrentUser()
    const messagesRef = Firebase.database().ref(`${chatCollection}/${chatRoomId}`)

    messages.forEach(message => {
        promises.push(new Promise((resolve, reject) => {
            message.timeStamp = - 1 * moment().valueOf();
            message.createdAt = firebase.database.ServerValue.TIMESTAMP;
            message.user = {
                _id: user.uid,
                name: user.displayName
            };

            messagesRef.push(message, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve()
                }
            });
        }))
    });

    return Promise.all(promises)
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
    });
}
