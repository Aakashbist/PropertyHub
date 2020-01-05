import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from "../../../../../resources/appRoute";
import PropertyDetailScreen from '../PropertyDetailScreen';
import PropertyListScreen from '../PropertyListScreen';
import AddPropertyScreen from '../AddPropertyScreen'



const PropertyStackNavigator = createStackNavigator(
    {
        PropertyListScreen: { screen: PropertyListScreen },
        PropertyDetailScreen: { screen: PropertyDetailScreen },
        AddPropertyScreen: { screen: AddPropertyScreen },
    },
    {
        initialRouteName: AppRoute.PropertyList,
        headerMode: 'none',
    },
);

export default PropertyStackNavigator;