import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    SignupScreen: { screen: SignupScreen },
    LoginScreen: { screen: LoginScreen }
  },
  {
    initialRouteName: 'LoginScreen',
  },
);

export default createAppContainer(AppNavigator);
