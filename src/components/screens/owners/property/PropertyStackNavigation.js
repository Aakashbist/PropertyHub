import React from 'react'
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import PropertyListScreen from '../property/PropertyListScreen';
import AddPropertyScreen from '../property/AddPropertyScreen';
import LeasedPropertyScreen from './LeasedPropertyScreen'
import AppRoute from "../../../../resources/appRoute";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import colors from "../../../../resources/colors";
import { Icon } from "react-native-elements";


// const PropertyStackNavigator = createStackNavigator(
//     {
//         PropertyListScreen: { screen: PropertyListScreen },
//         AddPropertyScreen: { screen: AddPropertyScreen },
//         LeasedPropertyScreen: { screen: LeasedPropertyScreen }
//     },
//     {
//         initialRouteName: AppRoute.Property,
//         headerMode: 'none',
//     },
// );

const PropertyTabNavigator = createBottomTabNavigator(
    {
        PropertyListScreen:
        {
            screen: PropertyListScreen,
            navigationOptions: {
                tabBarLabel: 'My Property',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='navicon' type='evilicon' size={40} color={tintColor} />
                )
            }
        },
        AddPropertyScreen: {
            screen: AddPropertyScreen, navigationOptions: {
                tabBarLabel: 'Add',
                labelStyle: { fontSize: 12 },
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='plus' type='evilicon' size={40} color={tintColor} />
                )

            }
        },
        LeasedPropertyScreen: {

            screen: LeasedPropertyScreen,
            navigationOptions: {
                tabBarLabel: 'Leased',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='paperclip' type='evilicon' size={40} color={tintColor} />
                )
            }
        }

    },
    {
        initialRouteName: AppRoute.Property,
        headerMode: 'none',
        tabBarOptions: {
            activeTintColor: colors.white,
            inactiveTintColor: colors.darkWhite2,
            labelStyle: {
                fontSize: 14,
            },
            style: {
                backgroundColor: colors.blue,
            },
        }
    },

)


export default createAppContainer(PropertyTabNavigator);
