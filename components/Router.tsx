import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// import Home from './components/Home/Home';
import {HomeScreen, ProfileScreen, HomeStackScreen} from './home/HomeScreen';
import {
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Add from './home/Add';
import AddExpense from './expense/AddExpense';
import {colors} from './styles/common';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

enum Routes {
  HOME = 'home',
  STATS = 'stats',
  ADD = 'add',
  ACCOUNTS = 'accounts',
  SETTINGS = 'settings',
}

const Home = ({navigation}) => {
  return (
    <View style={styles.appContainer}>
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
                iconName = 'add';
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
            if (Routes.ADD === route.name) {
              return <Add navigation={navigation} />;
            } else {
              return (
                <Icon
                  name={iconName}
                  color={focused ? 'black' : '#CCCCCC'}
                  size={28}
                />
              );
            }
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
    </View>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Add" component={AddExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    height: '100%',
    position: 'relative',
  },
});

export default Router;
