import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import AppDrawerNavigator from './AppDrawerNavigator';
import AuthStack from './AuthStack';
import AppRoute from '../resources/appRoute';

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppDrawerNavigator,
  },
  {
    initialRouteName: AppRoute.AuthLoading,
  },
);

export default createAppContainer(switchNavigator);
