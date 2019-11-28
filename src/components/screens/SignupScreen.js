import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ButtonGroup, Icon, Header } from 'react-native-elements';
import Firebase from '../../config/Firebase';
import { Owner, Tenant } from '../../models/userModels';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import GeneralStatusBarColor from '../GeneralStatusBarColor';
import parseFirebaseError from './FirebaseErrorParser';

const SignupSteps = {
  SIGNUP: 0,
  SIGNUP_SUCCESS: 1
}

const UserType = {
  TENANT: 'Tenant',
  OWNER: 'Owner'
}

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(UserType.TENANT);
  const [error, setError] = useState();
  const [step, setStep] = useState(SignupSteps.SIGNUP);
  const [canSignUp, setCanSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [UserType.TENANT, UserType.OWNER]

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
        let user;
        let userDb;
        switch (userType) {
          case UserType.TENANT:
            user = new Tenant(currentUser.uid, name, email);
            userDb = "tenants";
            break;
          case UserType.OWNER:
            user = new Owner(currentUser.uid, name, email);
            userDb = "owners";
            break;
        }
        Firebase.database().ref().child(userDb + '/' + user.id).set(user).then(() => {
          currentUser.sendEmailVerification();
          setStep(SignupSteps.SIGNUP_SUCCESS);
          setIsLoading(false);
        }).catch((error) => {
          setError(error);
        })
      })
      .catch((error) => {
        let errorMessage = parseFirebaseError(error);
        if (errorMessage) {
          setError(errorMessage);
        }
      })
  }

  navigateToLogin = () => {
    props.navigation.navigate(AppRoute.Login);
  }

  updateIndex = (index) => {
    let userType = userTypes[index];
    setUserType(userType);
  }

  let messageView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;

  let view = step === SignupSteps.SIGNUP ? <React.Fragment>
    <Image
      source={require('../../assets/icon/homeIcon.png')}
      style={{ width: 200, height: 200, marginBottom: 30 }}
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
    <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={userTypes.indexOf(userType)}
      buttons={userTypes}
      selectedTextStyle={{ fontSize: 18 }}
      textStyle={{ color: colors.darkWhite2 }}
      innerBorderStyle={{ color: colors.green }}
      selectedButtonStyle={{ backgroundColor: colors.green }}
      containerStyle={{ width: '80%', height: 60 }}
    />

    {messageView}

    <TouchableOpacity
      style={canSignUp ? styles.button : styles.buttonDisabled}
      onPress={this.handleSignUp}
      disabled={!canSignUp}>
      <Text style={canSignUp ? styles.buttonText : styles.buttonTextDisabled}>SignUp </Text>
    </TouchableOpacity>
    <View style={{ marginBottom: 20 }}>
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
        {view}
      </View>
    </ScrollView>
  )
}

export default Signup
