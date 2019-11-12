import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AppDrawerNavigator from './AppDrawerNavigator';
import AuthStack from './AuthStack';

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppDrawerNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(switchNavigator);
