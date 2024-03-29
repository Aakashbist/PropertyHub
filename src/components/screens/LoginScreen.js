import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Firebase } from '../../config/Firebase';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import parseFirebaseError from '../errorParser/FirebaseErrorParser';

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

    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => setError(parseFirebaseError(error)))
    }

    let errorView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <View style={styles.container} >
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