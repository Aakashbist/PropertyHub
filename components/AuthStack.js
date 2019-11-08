
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen'


const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    SignupScreen: { screen: SignupScreen },
    LoginScreen: { screen: LoginScreen }
  },
  {
    initialRouteName: 'SignupScreen',
  },
);

export default createAppContainer(AppNavigator);
