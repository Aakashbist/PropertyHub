import { createStackNavigator } from 'react-navigation-stack';
import PropertySearch from '../PropertySearch';
import PropertyDetails from '../PropertyDetails';
import AppRoute from '../../../../resources/appRoute';
import styles from '../../../../resources/styles';
import { Icon } from 'react-native-elements';
import React from 'react';

const PropertySearchStackNavigator = createStackNavigator(
    {
        PropertySearch: { screen: PropertySearch },
        PropertyDetails: { screen: PropertyDetails }
    },
    {
        initialRouteName: AppRoute.PropertySearch,
        headerMode: 'none',
    },
);

PropertySearchStackNavigator.navigationOptions = (props) => ({
    drawerLabel: 'Property Lookup',
    drawerIcon: ({ tintColor }) => (
        <Icon name='search'
            type='font-awesome'
            style={styles.drawerIcon}
            color={tintColor}
        />
    ),
});

export default PropertySearchStackNavigator;