import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Firebase from '../../config/Firebase';
import { User } from '../../models/user';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import GeneralStatusBarColor from '../GeneralStatusBarColor';

const Signup = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [canSignUp, setCanSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let _canSignUp = email.trim().length > 0 && password.trim().length > 0 &&
      name.trim().length > 0 && !isLoading;
    if (canSignUp !== _canSignUp) {
      setCanSignUp(_canSignUp);
    }
  }, [name, email, password, isLoading]);

  handleSignUp = () => {
    setIsLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const currentUser = Firebase.auth().currentUser;
        const user = new User(currentUser.uid, name, email);

        Firebase.database().ref().child('users/' + user.id).set({
          name: name,
          email: email
        }).then(() => {
          currentUser.sendEmailVerification();
          let successMessage;
          successMessage = 'Your Account is created please verify your account';
          if (successMessage) {
            setSuccess(successMessage);
          }
        }).catch((error) => {
          alert(error);
        })
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
        alert(error)
      }).finally (() => {
        setIsLoading(false);
      })
  }

  //let successView = success ? <Text style={{ color: colors.textColorSuccess }}>{success}</Text> : null;

  let messageView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> :
    success ? <Text style={{ color: colors.textColorSuccess }}>{success}</Text> : null;

  return (
    <View style={styles.container}>
      <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
      <Image
        source={require('../../assets/icon/homeIcon.png')}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        style={styles.inputBox}
        value={name}
        onChangeText={(name) => setName(name)}
        placeholder='Name'
        autoCapitalize='words'
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

      {messageView}

      <TouchableOpacity
        style={canSignUp ? styles.button : styles.buttonDisabled}
        onPress={this.handleSignUp}
        disabled={!canSignUp}>
        <Text style={styles.buttonText}>SignUp </Text>
      </TouchableOpacity>
      <View>
        <Text> Already have an account?
            <Text onPress={() => props.navigation.navigate(AppRoute.Login)} style={styles.primaryText}> Login </Text>
        </Text>
      </View>
    </View>
  )
}

export default Signup
