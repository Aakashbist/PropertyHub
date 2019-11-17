import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Firebase from '../config/Firebase';
import styles from '../resources/styles';
import colors from '../resources/colors';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

const Signup = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [canSignUp, setCanSignUp] = useState(false);

  useEffect(() => {
    let hasEmailAndPassword = email.trim().length > 0 && password.trim().length > 0;
    if (canSignUp !== hasEmailAndPassword) {
      setCanSignUp(hasEmailAndPassword);
    }
  }, [email, password]);

  handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = Firebase.auth().currentUser;
      })
      .catch((error) => {
        let errorMessage;
        if (error.code == 'auth/email-already-in-use') {
          errorMessage = 'Email already used';
        } else if (error.code == 'auth/weak-password') {
          errorMessage = 'Password is to weak';
        } else if (error.code == 'auth/invalid-email') {
          errorMessage = 'Email is invalid';
        } else {
          errorMessage = 'Failed creating account ' + error.code;
        }
        if (errorMessage) {
          setError(errorMessage);
        }
      })
  }

  let errorView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

  return (
    <View style={styles.container}>
      <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
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
      {errorView}
      <TouchableOpacity
        style={canSignUp ? styles.button : styles.buttonDisabled}
        onPress={this.handleSignUp}
        disabled={!canSignUp}>
        <Text style={styles.buttonText}>SignUp </Text>
      </TouchableOpacity>
      <View>
        <Text> Already have an account?
            <Text onPress={() => props.navigation.navigate('LoginScreen')} style={styles.primaryText}> Login </Text>
        </Text>
      </View>
    </View>
  )
}

export default Signup
