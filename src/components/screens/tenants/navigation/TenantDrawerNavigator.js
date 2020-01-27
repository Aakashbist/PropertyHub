import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AppRoute from '../../../../resources/appRoute';
import DashboardScreen from '../../DashboardScreen';
import PropertySearchStackNavigator from './PropertySearchStackNavigator';
import DrawerMenu from '../../../DrawerMenu';
import colors from '../../../../resources/colors';
import ChatStackNavigator from '../../../ChatStackNavigator';
import DashboardStackNavigator from '../../../DashboardStackNavigator';

const DrawerNavigator = createDrawerNavigator({
    DashboardScreen: DashboardStackNavigator,
    PropertySearch: PropertySearchStackNavigator,
    ChatScreen: ChatStackNavigator
},
    {
        initialRouteName: AppRoute.Dashboard,
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
