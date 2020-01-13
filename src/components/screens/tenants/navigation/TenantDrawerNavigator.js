import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AppRoute from '../../../../resources/appRoute';
import DashboardScreen from '../../DashboardScreen';
import PropertySearchStackNavigator from './PropertySearchStackNavigator';
import DrawerMenu from '../../../DrawerMenu';
import colors from '../../../../resources/colors';
import ChatStackNavigator from '../../../ChatStackNavigator';

const DrawerNavigator = createDrawerNavigator({
    DashboardScreen: { screen: DashboardScreen },
    PropertySearch: PropertySearchStackNavigator,
    ChatScreen: ChatStackNavigator
},
    {
        initialRouteName: AppRoute.PropertySearch,
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
