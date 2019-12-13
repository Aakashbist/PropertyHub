import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import PropertyListScreen from '../property/PropertyListScreen';
import AddPropertyScreen from '../property/AddPropertyScreen';
import PropertyTenancyAgreementScreen from '../property/PropertyTenancyAgreementScreen'
import AppRoute from "../../../../resources/appRoute";
import { createBottomTabNavigator } from 'react-navigation-tabs';

const PropertyStackNavigator = createStackNavigator(
    {
        PropertyListScreen: { screen: PropertyListScreen },
        AddPropertyScreen: { screen: AddPropertyScreen },
        PropertyTenancyAgreementScreen: { screen: PropertyTenancyAgreementScreen }
    },
    {
        initialRouteName: AppRoute.Property,
        headerMode: 'none',
    },
);

// const PropertyTabNavigator = createBottomTabNavigator(
//     {
//         PropertyListScreen: { screen: PropertyListScreen },
//         AddPropertyScreen: { screen: AddPropertyScreen }
//     },
//     {
//         initialRouteName: AppRoute.Property,
//         headerMode: 'none',
//         tabBarOptions: {
//             activeTintColor: '#e91e63',
//             labelStyle: {
//                 fontSize: 12,
//             },
//             style: {
//                 backgroundColor: 'blue',
//             },
//         }
//     },

// )


export default createAppContainer(PropertyStackNavigator);
