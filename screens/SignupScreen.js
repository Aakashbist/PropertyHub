

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import firebase from '../config/Firebase';

class Signup extends React.Component {

  state = { email: '', password: '' }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('LoginScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  handleSignUp = () => {

    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Profile'))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
        <TextInput
          style={styles.inputBox}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder='Full Name'
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder='Email'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder='Password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <View>
          <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('LoginScreen')} style={{ color: '#e93766', fontSize: 18 }}> Login </Text></Text>
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

export default Signup
