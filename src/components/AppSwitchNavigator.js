import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import AuthStack from './AuthStack';
import AppRoute from '../resources/appRoute';
import TenantDrawerNavigator from './TenantDrawerNavigator';
import OwnerDrawerNavigator from './OwnerDrawerNavigator';

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Owner: OwnerDrawerNavigator,
    Tenant: TenantDrawerNavigator,
  },
  {
    initialRouteName: AppRoute.AuthLoading,
  },
);

export default createAppContainer(switchNavigator);
