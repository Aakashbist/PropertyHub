import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthStack from './AuthStack';
import AppDrawerNavigator from './AppDrawerNavigator';

const switchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        App: AppDrawerNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default createAppContainer(switchNavigator);