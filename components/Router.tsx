import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// import Home from './components/Home/Home';
import {HomeScreen, ProfileScreen, HomeStackScreen} from './home/HomeScreen';
import { Button } from 'react-native';
// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

enum Routes {
  HOME = 'home',
  STATS = 'stats',
  ADD = 'add',
  ACCOUNTS = 'accounts',
  SETTINGS = 'settings',
}

const Router = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case Routes.HOME:
                iconName = 'home';
                break;
              case Routes.STATS:
                iconName = 'pie-chart';
                break;
              case Routes.ADD:
                iconName = '';
                break;
              case Routes.ACCOUNTS:
                iconName = 'account-balance';
                break;
              case Routes.SETTINGS:
                iconName = 'settings';
                break;
              default:
                break;
            }
            // You can return any component that you like here!
            return (
              <Icon
                style={{}}
                name={iconName}
                color={focused ? 'black' : '#CCCCCC'}
                size={28}
              />
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'transparent',
        })}>
        <Tab.Screen name={Routes.HOME} component={HomeScreen} />
        <Tab.Screen name={Routes.STATS} component={ProfileScreen} />
        <Tab.Screen name={Routes.ADD} component={ProfileScreen} />
        <Tab.Screen name={Routes.ACCOUNTS} component={ProfileScreen} />
        <Tab.Screen name={Routes.SETTINGS} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
