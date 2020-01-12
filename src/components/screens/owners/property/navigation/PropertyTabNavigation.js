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
import styles from '../../../../../resources/styles';

const PropertyTabNavigator = createBottomTabNavigator({
  PropertyListScreen: {
    screen: PropertyStackNavigator,
    navigationOptions: {
      tabBarLabel: 'PROPERTIES',
      tabBarIcon: ({ tintColor, size }) => (
        <Icon name='menu' type='entypo' size={size} color={tintColor} />
      ),
    }
  },
  AddPropertyScreen: {
    screen: AddPropertyScreen,
    navigationOptions: {
      tabBarLabel: 'ADD',
      tabBarIcon: ({ tintColor, size }) => (
        <Icon name='plus' type='entypo' size={size} color={tintColor} />
      ),
    }
  },
  LeasedPropertyScreen: {
    screen: LeasedPropertyScreen,
    navigationOptions: {
      tabBarLabel: 'CHATS',
      tabBarIcon: ({ tintColor, size }) => (
        <Icon name='typing' type='entypo' size={size} color={tintColor} />
      ),
    }
  }
},
  {
    initialRouteName: AppRoute.Property,
    tabBarOptions: {
      style: {
        height: 54,
        backgroundColor: colors.primaryDark,
        borderTopColor: colors.primaryDark,
        paddingBottom: 8
      },
      activeTintColor: colors.accent,
      inactiveTintColor: colors.white,
      labelStyle: {
        fontSize: 12
      }
    },
    headerMode: 'float'
  }
);

const appContainer = createAppContainer(PropertyTabNavigator)
appContainer.navigationOptions = (props) => ({
  drawerLabel: 'Property',
  drawerIcon: ({ tintColor }) => (
    <Icon name='home'
      type='font-awesome'
      style={styles.drawerIcon}
      color={tintColor}
    />
  ),
});

export default appContainer;
