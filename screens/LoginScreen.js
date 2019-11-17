import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Firebase from '../config/Firebase';
import colors from '../resources/colors';
import styles from '../resources/styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
            .catch((error) => setError(error.errorMessage))
    }

    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                user = firebase.auth().currentUser;
                if (user) {
                    props.navigation.navigate('App')
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
                if (errorMessage) {
                    setError(errorMessage);
                }
            })
    }

    let errorView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

    return (
        <View style={styles.container} >
            <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
            <Image
                source={require('../assets/icon/homeIcon.png')}
                style={{ width: 200, height: 200, marginBottom: 50 }}
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
            {errorView}
            <TouchableOpacity
                style={canLogin ? styles.button : styles.buttonDisabled}
                onPress={this.handleLogin}
                disabled={!canLogin}>
                <Text style={styles.buttonText}>Login </Text>
            </TouchableOpacity>
            <View>
                <Text> Don't have an account? <Text onPress={() => props.navigation.navigate('SignupScreen')}
                    style={styles.primaryText}> Sign Up </Text></Text>
            </View>
        </View>
    )
}

export default Login
