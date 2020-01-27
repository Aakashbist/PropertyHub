import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from '../resources/appRoute';
import DashboardScreen from './screens/DashboardScreen';
import RentDetailsScreen from './screens/RentDetailsScreen';
import { Icon } from 'react-native-elements';
import styles from '../resources/styles';


const DashboardStackNavigator = createStackNavigator(
    {
        DashboardScreen: { screen: DashboardScreen },
        RentDetailsScreen: { screen: RentDetailsScreen }
    },
    {
        initialRouteName: AppRoute.Dashboard,
    },
);

const app = createAppContainer(DashboardStackNavigator);
app.navigationOptions = (props) => ({
    drawerLabel: 'Dashboard',
    drawerIcon: ({ tintColor }) => (
        <Icon name='th'
            type='font-awesome'
            style={styles.drawerIcon}
            color={tintColor}
        />
    ),
});

export default app;