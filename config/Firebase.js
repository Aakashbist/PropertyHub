import firebase from 'firebase'

const firebaseConfig = {
    // apiKey: API_KEY,
    // authDomain: AUTH_DOMAIN,
    // databaseURL: DATABASE_URL,
    // projectId: PROJECT_ID,
    // storageBucket: '',
    // messagingSenderId: MESSAGE_SENDER_ID,
    // appId: APP_ID
    apiKey: "AIzaSyBACLpvymneTmxW216e5LSPP63yf1sLn5w",
    authDomain: "propertyhub-820e2.firebaseapp.com",
    databaseURL: "https://propertyhub-820e2.firebaseio.com",
    projectId: "propertyhub-820e2",
    storageBucket: "propertyhub-820e2.appspot.com",
    messagingSenderId: "858836941342",
    appId: "1:858836941342:web:48b6fb4ef4942c0c718c0f",
    measurementId: "G-TE6VRGKBY4"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
