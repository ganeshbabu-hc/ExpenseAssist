import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppHeader from '../common/AppHeader';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {commonStyles} from '../styles/common';
import SummaryList from './SummaryList';
import Add from './Add';
import QuickMenu from './QuickMenu';
import Wave from './Wave';
import DBApp from '../dbtest/DBApp';
import RecentExpenses from '../expense/RecentExpenses';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

export const ProfileScreen = ({route}: any) => {
  return <Text>This is me</Text>;
};

export const HomeScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={commonStyles.container}>
            <AppHeader navigation={navigation} />
            <SummaryList />
          </View>
          {/* <DBApp /> */}
          {/* <QuickMenu /> */}
          <RecentExpenses />
        </ScrollView>
      </SafeAreaView>
      {/* <Add /> */}
      {/* <Wave /> */}
    </React.Fragment>
  );
};