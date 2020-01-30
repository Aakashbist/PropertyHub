import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerMenu from '../../../../DrawerMenu';
import OwnerDashboardScreen from '../../OwnerDashboardScreen';
import PropertyTabNavigation from './PropertyTabNavigation';
import AppRoute from '../../../../../resources/appRoute';
import colors from '../../../../../resources/colors';
import ChatStackNavigator from '../../../../ChatStackNavigator';

const DrawerNavigator = createDrawerNavigator({
    OwnerDashboardScreen: OwnerDashboardScreen,
    PropertyListScreen: PropertyTabNavigation,
    ChatScreen: ChatStackNavigator
},
    {
        initialRouteName: AppRoute.OwnerDashBoard,
        drawerPosition: "left",
        drawerType: 'slide',
        edgeWidth: 100,
        contentComponent: DrawerMenu,
        contentOptions: {
            activeTintColor: colors.primary,
        }
    }
);

export default createAppContainer(DrawerNavigator);
