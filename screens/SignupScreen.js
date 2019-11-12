import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Firebase from '../config/Firebase';

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
        <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>

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
