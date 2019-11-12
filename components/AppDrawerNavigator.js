import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerMenu from './DrawerMenu';

const DrawerNavigator = createDrawerNavigator({
    DashBoardScreen: { screen: DashBoardScreen },
    ProfileScreen: { screen: ProfileScreen },
},
    {
        initialRouteName: "DashBoardScreen",
        drawerPosition: "left",
        contentComponent: DrawerMenu

    }
);




export default createAppContainer(DrawerNavigator);

