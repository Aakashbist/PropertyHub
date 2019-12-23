import { Label, View } from 'native-base';
import React from 'react';
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AppRoute from "../../../../../resources/appRoute";
import colors from "../../../../../resources/colors";
import AddPropertyScreen from '../AddPropertyScreen';
import LeasedPropertyScreen from '../LeasedPropertyScreen';
import PropertyStackNavigator from '../navigation/PropertyStackNavigation';


const PropertyTabNavigator = createBottomTabNavigator(
    {
        PropertyListScreen: {
            screen: PropertyStackNavigator
        },
        AddPropertyScreen: { screen: AddPropertyScreen },
        LeasedPropertyScreen: { screen: LeasedPropertyScreen }
    },
    {
        initialRouteName: AppRoute.Property,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                let { routeName } = navigation.state;
                let iconName;
                if (routeName === AppRoute.Property) {
                    iconName = `navicon`;
                }
                else if (routeName === AppRoute.AddProperty) {
                    tabBarLabel = "Add";
                    iconName = "plus";
                }
                else if (routeName === AppRoute.LeasedProperty) {
                    tabBarLabel = "Leased";
                    iconName = "paperclip";
                }
                return (
                    <Icon name={`${iconName}`} type='evilicon' size={40} color={`${tintColor}`} />
                )
            },

            tabBarLabel: ({ tintColor }) => {
                let { routeName } = navigation.state;
                let title;
                if (routeName === AppRoute.Property) {
                    title = `My Property`
                }
                else if (routeName === AppRoute.AddProperty) {
                    title = `Add`
                }
                else if (routeName === AppRoute.LeasedProperty) {
                    title = `Leased`
                }
                return (
                    <View style={{ alignItems: 'center' }}>
                        <Label style={{ color: `${tintColor}` }}>{title}</Label>
                    </View>
                )
            }
        }),
        headerMode: 'float',
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
    }
)


export default createAppContainer(PropertyTabNavigator);
