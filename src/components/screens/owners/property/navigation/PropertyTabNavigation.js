import React from 'react';
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AppRoute from "../../../../../resources/appRoute";
import colors from "../../../../../resources/colors";
import styles from '../../../../../resources/styles';
import ChatStackNavigator from '../../../../ChatStackNavigator';
import AddPropertyScreen from '../AddPropertyScreen';
import PropertyStackNavigator from '../navigation/PropertyStackNavigation';

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
  }
},
  {
    initialRouteName: AppRoute.PropertyList,
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
  drawerLabel: 'Properties',
  drawerIcon: ({ tintColor }) => (
    <Icon name='home'
      type='font-awesome'
      style={styles.drawerIcon}
      color={tintColor}
    />
  ),
});

export default appContainer;
