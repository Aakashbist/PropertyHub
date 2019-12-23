import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from "../../../../../resources/appRoute";
import PropertyDetailScreen from '../PropertyDetailScreen';
import PropertyListScreen from '../PropertyListScreen';



const PropertyStackNavigator = createStackNavigator(
    {
        PropertyListScreen: { screen: PropertyListScreen },
        PropertyDetailScreen: { screen: PropertyDetailScreen }
    },
    {
        initialRouteName: AppRoute.property,
        headerMode: 'none',
    },
);

export default PropertyStackNavigator;