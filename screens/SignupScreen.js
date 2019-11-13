import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Firebase from '../config/Firebase';
import styles from '../styles/styles';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: 'Sign In',
    headerTintColor: '#fff',
    headerStyle: {
      fontSize: 40,
      backgroundColor: '#e93766',
    },
  };

  handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        alert("in success");
        const user = Firebase.auth().currentUser;
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          alert('Email already used')
        } else if (error.code == 'auth/weak-password') {
          alert('password is to weak')
        } else {
          alert('failed creating account' + error.code)
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/icon/homeIcon.png')}
          style={{ width: 200, height: 200 }}
        />

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
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <View>
          <Text> Already have an account?
            <Text onPress={() => this.props.navigation.navigate('LoginScreen')} style={styles.primaryText}> Login </Text>
          </Text>
        </View>
      </View>
    )
  }
}

export default Signup
