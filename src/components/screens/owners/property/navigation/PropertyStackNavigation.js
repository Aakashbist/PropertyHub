import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from "../../../../../resources/appRoute";
import PropertyListScreen from '../PropertyListScreen';
import AddPropertyScreen from '../AddPropertyScreen'

const PropertyStackNavigator = createStackNavigator(
    {
        PropertyListScreen: { screen: PropertyListScreen },
        AddPropertyScreen: { screen: AddPropertyScreen },
    },
    {
        initialRouteName: AppRoute.PropertyList,
        headerMode: 'none',
    },
);

export default PropertyStackNavigator;