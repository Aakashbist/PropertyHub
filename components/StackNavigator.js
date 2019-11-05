import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import DashBoardScreen from '../screens/DashBoardScreen';
import LoginScreen from '../screens/LoginScreen';



const AppNavigator=createStackNavigator({
    HomeScreen:{screen:HomeScreen},
    LoginScreen:{screen:LoginScreen},
    DashBoardScreen:{screen:DashBoardScreen}
   },
   {
       initialRouteName:"HomeScreen"
   });

  export default  createAppContainer(AppNavigator);