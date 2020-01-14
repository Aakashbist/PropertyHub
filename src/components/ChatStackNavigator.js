import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppRoute from '../resources/appRoute';
import ChatScreen from './screens/ChatScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import { Icon } from 'react-native-elements';
import styles from '../resources/styles';


const ChatStackNavigator = createStackNavigator(
    {
        ChatScreen: { screen: ChatScreen },
        ChatRoomScreen: { screen: ChatRoomScreen }

    },
    {
        initialRouteName: AppRoute.Chat,

    },
);

const app = createAppContainer(ChatStackNavigator);
app.navigationOptions = (props) => ({
    drawerLabel: 'Chat',
    drawerIcon: ({ tintColor }) => (
        <Icon name='comments'
            type='font-awesome'
            style={styles.drawerIcon}
            color={tintColor}
        />
    ),
});

export default app;