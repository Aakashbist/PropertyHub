import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AppRoute from '../../../../resources/appRoute';
import DashboardScreen from '../../DashboardScreen';
import PropertySearchStackNavigator from './PropertySearchStackNavigator';
import DrawerMenu from '../../../DrawerMenu';
import colors from '../../../../resources/colors';

const DrawerNavigator = createDrawerNavigator({
    DashboardScreen: { screen: DashboardScreen },
    PropertySearch: PropertySearchStackNavigator,
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
