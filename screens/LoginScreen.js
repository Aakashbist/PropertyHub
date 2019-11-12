
import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import Firebase from '../config/Firebase';

class Login extends React.Component {
    constructor(props) {

        super(props);

        this.state = { email: '', password: '', error: '' }
    }

    static navigationOptions = {

        headerTitle: 'Login',
        headerTintColor: '#fff',
        headerStyle: {

            backgroundColor: '#e93766',
        },
    };

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
                <Text style={{ color: '#e93766', fontSize: 40 }}>Login</Text>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Login </Text>
                </TouchableOpacity>
                <View>
                    <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignupScreen')}
                        style={{ color: '#e93766', fontSize: 18 }}> Sign Up </Text></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#e93766',
        borderColor: '#e93766',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Login
