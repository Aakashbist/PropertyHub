import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AppRoute from '../../../resources/appRoute';
import DashboardScreen from '../DashboardScreen';
import DrawerMenu from '../../DrawerMenu';
import PropertySearch from './PropertySearch';

const DrawerNavigator = createDrawerNavigator({
    DashboardScreen: { screen: DashboardScreen },
    PropertySearch: { screen: PropertySearch },
},
    {
        initialRouteName: AppRoute.PropertySearch,
        drawerPosition: "left",
        drawerType: 'slide',
        edgeWidth: 100,
        contentComponent: DrawerMenu
    }
);

export default createAppContainer(DrawerNavigator);

/*  steps to enable swipe
    https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html

    1. sudo npm install react-native-gesture-handler --save
    2. react-native link react-native-gesture-handler
    3. add these lines for swipe to work
        import com.facebook.react.ReactActivity;
        import com.facebook.react.ReactActivityDelegate;
        import com.facebook.react.ReactRootView;
        import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

        @Override
        protected ReactActivityDelegate createReactActivityDelegate() {
            return new ReactActivityDelegate(this, getMainComponentName()) {
                @Override
                protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
                }
            };
        }
    4.
 */