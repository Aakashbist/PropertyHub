import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerMenu from '../../../../DrawerMenu';
import DashboardScreen from '../../../DashboardScreen';
import PropertyTabNavigation from './PropertyTabNavigation';
import AppRoute from '../../../../../resources/appRoute';
import colors from '../../../../../resources/colors';
import ChatStackNavigator from '../../../../ChatStackNavigator';
import DashboardStackNavigator from '../../../../DashboardStackNavigator';

const DrawerNavigator = createDrawerNavigator({
    DashboardScreen: DashboardStackNavigator,
    PropertyListScreen: PropertyTabNavigation,
    ChatScreen: ChatStackNavigator
},
    {
        initialRouteName: AppRoute.PropertyList,
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
