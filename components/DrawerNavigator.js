import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';

const DrawerNavigator=createDrawerNavigator({
    DashBoardScreen:{screen:DashBoardScreen},
    ProfileScreen:{screen:ProfileScreen},
    
   },
   {
       initialRouteName:"DashBoardScreen"
   });

  export default  createAppContainer(DrawerNavigator);