import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Firebase from '../config/Firebase';
import styles from '../styles/styles';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [canLogin, setCanLogin] = useState(false);

    useEffect(() => {
        let hasEmailAndPassword = email.trim().length > 0 && password.trim().length > 0;
        if (canLogin !== hasEmailAndPassword) {
            setCanLogin(hasEmailAndPassword);
        }
    }, [email, password]);

    getTokenId = () => {
        Firebase.auth().currentUser
            .getIdToken(true)
            .then((token) => {
                return token;
            })
            .catch((error) => alert(error))
    }

    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                user = firebase.auth().currentUser;
                if (user) {
                    this.props.navigation.navigate('App')
                }
            })
            .catch((error) => {
                let errorMessage;
                if (error.code == 'auth/wrong-password') {
                    errorMessage = 'Wrong Password';
                }
                else if (error.code == 'auth/invalid-email') {
                    errorMessage = 'Invalid Email';
                }
                else if (error.code == 'auth/user-not-found') {
                    errorMessage = 'Invalid User';
                }
                alert(errorMessage);
                setError(errorMessage);
            })
    }

    return (
        <View style={styles.container} >
            <Image
                source={require('../assets/icon/homeIcon.png')}
                style={{ width: 200, height: 200 }}
            />
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={canLogin ? styles.button : styles.buttonDisabled}
                onPress={this.handleLogin}
                disabled={!canLogin}>
                <Text style={styles.buttonText}>Login </Text>
            </TouchableOpacity>
            <View>
                <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignupScreen')}
                    style={styles.primaryText}> Sign Up </Text></Text>
            </View>
        </View>
    )
}

export default Login
