import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Firebase from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import parseFirebaseError from '../firebase/FirebaseErrorParser';
import GeneralStatusBarColor from '../GeneralStatusBarColor';

const Login = (props) => {
    const [email, setEmail] = useState('dilroop.singh@gmail.com');
    const [password, setPassword] = useState('Qwerty123456');
    const [error, setError] = useState();
    const [canLogin, setCanLogin] = useState(false);

    useEffect(() => {
        let hasEmailAndPassword = email.trim().length > 0 && password.trim().length > 0;
        if (canLogin !== hasEmailAndPassword) {
            setCanLogin(hasEmailAndPassword);
        }
    }, [email, password]);

    handleLogin = () => {
        let result; 
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                result = data;
                Firebase.auth().currentUser.getIdTokenResult();
            })
            .then((token) => {
                if (result.user.emailVerified) {
                    this.props.navigation.navigate(token.claims.isOwner ? AppRoute.Owner: AppRoute.Tenant);
                } else {
                    Firebase.auth().signOut()
                        .then(() => setError('Please check your email for verification link'))
                        .catch((error) => setError(parseFirebaseError(error)))
                }
            })
            .catch((error) => setError(parseFirebaseError(error)))
    }

    let errorView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.container} >
                <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
                <Image
                    source={require('../../assets/icon/homeIcon.png')}
                    style={{ width: 200, height: 200, marginBottom: 30 }}
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
                    <Text style={canLogin ? styles.buttonText : styles.buttonTextDisabled}>Login </Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 20 }}>
                    <Text> Don't have an account? <Text onPress={() => props.navigation.navigate(AppRoute.Signup)}
                        style={styles.primaryText}> Sign Up </Text></Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login
