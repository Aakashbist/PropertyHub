import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator'



const AppNavigator=createStackNavigator({
    HomeScreen:{screen:HomeScreen},
    LoginScreen:{screen:LoginScreen},
    DrawerNavigator:{screen:DrawerNavigator}
    
   },
   {
       initialRouteName:"HomeScreen"
   });

  export default  createAppContainer(AppNavigator);