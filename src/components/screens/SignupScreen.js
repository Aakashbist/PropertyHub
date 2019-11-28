import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Firebase from '../../config/Firebase';
import { User } from '../../models/user';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import GeneralStatusBarColor from '../GeneralStatusBarColor';
import parseFirebaseError from './FirebaseErrorParser';

const SignupSteps = {
  SIGNUP: 0,
  SIGNUP_SUCCESS: 1
}

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [step, setStep] = useState(SignupSteps.SIGNUP);
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
        Firebase.database().ref().child('users/' + user.id).set(user).then(() => {
          currentUser.sendEmailVerification();
          setStep(SignupSteps.SIGNUP_SUCCESS);
        }).catch((error) => {
          setError(error);
        })
      })
      .catch((error) => {
        let errorMessage = parseFirebaseError(error);
        if (errorMessage) {
          setError(errorMessage);
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }

  navigateToLogin = () => {
    props.navigation.navigate(AppRoute.Login);
  }

  let messageView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

  let view = step === SignupSteps.SIGNUP ? <React.Fragment>
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
  </React.Fragment> :
    <React.Fragment>
      <Container style={styles.containerFull}>
        <Image
          source={require('../../assets/icon/homeIcon.png')}
          style={{ width: 200, height: 200, marginTop: 50, marginBottom: 50 }}
        />
        <Text style={styles.primaryTextHeading}>Account Created</Text>
        <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 50 }}>Your Account is created please verify your account.</Text>

        <TouchableOpacity
          style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
          onPress={navigateToLogin}>
          <Icon name='chevron-left' type='evilicon' color={colors.primary} />
          <Text style={styles.primaryText}>Go Back to Login</Text>
        </TouchableOpacity>
      </Container>
    </React.Fragment>;

  return (
    <View style={styles.container}>
      <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
      {view}
    </View>
  )
}

export default Signup
