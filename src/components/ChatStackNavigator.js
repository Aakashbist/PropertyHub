import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from '../resources/appRoute';
import ChatScreen from './screens/ChatScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';


const ChatStackNavigator = createStackNavigator(
    {
        ChatScreen: { screen: ChatScreen },
        ChatRoomScreen: { screen: ChatRoomScreen }

    },
    {
        initialRouteName: AppRoute.Chat,
        headerMode: 'none',
    },
);

export default createAppContainer(ChatStackNavigator);