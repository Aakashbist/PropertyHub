import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerMenu from '../../../../DrawerMenu';
import DashboardScreen from '../../../DashboardScreen';
import PropertyTabNavigation from './PropertyTabNavigation';
import AppRoute from '../../../../../resources/appRoute';
import colors from '../../../../../resources/colors';
import ChatStackNavigator from '../../../../ChatStackNavigator';

const DrawerNavigator = createDrawerNavigator({
    DashboardScreen: { screen: DashboardScreen },
    PropertyListScreen: PropertyTabNavigation,
    ChatScreen: ChatStackNavigator
},
    {
        initialRouteName: AppRoute.Chat,
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
