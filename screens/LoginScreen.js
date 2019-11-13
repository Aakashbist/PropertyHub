import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Firebase from '../config/Firebase';
import styles from '../styles/styles';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', canLogin: false }
    }

    updateValues = () => {
        let hasEmailAndPassword = this.state.email.trim().length > 0 &&
            this.state.password.trim().length > 0;
        if (this.state.canLogin !== hasEmailAndPassword) {
            this.setState({ canLogin: hasEmailAndPassword });
            this.setState({ canLogin: hasEmailAndPassword }); 
        }
    }

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
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                user = firebase.auth().currentUser;

                if (user) {
                    this.props.navigation.navigate('App')
                }
            })
            .catch((error) => {
                if (error.code == 'auth/wrong-password') {
                    alert('Wrong Password')
                }
                else if (error.code == 'auth/invalid-email') {
                    alert('Invalid Email')
                }
                else if (error.code == 'auth/user-not-found') {
                    alert('Invalid User')
                }
            })
    }

    render() {
        return (
            <View style={styles.container} >
                <Image
                    source={require('../assets/icon/homeIcon.png')}
                    style={{ width: 200, height: 200 }}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={(email) => {
                        this.setState({ email });
                        this.updateValues();
                    }}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({ password });
                        this.updateValues();
                    }}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={this.state.canLogin ? styles.button : styles.buttonDisabled} onPress={this.handleLogin} disabled={this.state.canLogin}>
                    <Text style={styles.buttonText}>Login </Text>
                </TouchableOpacity>
                <View>
                    <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignupScreen')}
                        style={styles.primaryText}> Sign Up </Text></Text>
                </View>
            </View>
        )
    }
}

export default Login
