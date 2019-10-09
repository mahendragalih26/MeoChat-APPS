import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Splash from '../Screens/Splash';
import Tabs from '../Screens/Main/Tabs';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import Profile from '../Screens/Main/Profile';
import Chat from '../Screens/Main/Chats';
// import Maps from '../Components/Maps/Map';

const AuthStack = createStackNavigator(
  {
    SigninScreen: {
      screen: Login,
    },
    SignupScreen: {
      screen: Register,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppStack = createStackNavigator(
  {
    HomeScreen: {
      screen: Tabs,
    },
    ProfileScreen: {
      screen: Profile,
    },
    chatScreen: {
      screen: Chat,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

const InitialNavigation = createSwitchNavigator({
  splashScreen: Splash,
  AppNavigator: {screen: AppNavigator},
});

export default AppContainer = createAppContainer(InitialNavigation);
