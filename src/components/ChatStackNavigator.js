import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from '../resources/appRoute';
import ChatScreen from './screens/ChatScreen';


const ChatStackNavigator = createStackNavigator(
    {
        ChatScreen: { screen: ChatScreen },

    },
    {
        initialRouteName: AppRoute.Chat,
        headerMode: 'none',
    },
);

export default createAppContainer(ChatStackNavigator);