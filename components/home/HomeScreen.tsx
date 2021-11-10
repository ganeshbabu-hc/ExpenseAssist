import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppHeader from '../common/AppHeader';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors, commonStyles} from '../styles/theme';
import SummaryList from './SummaryList';
import QuickMenu from './QuickMenu';
import RecentExpenses from '../expense/RecentExpenses';
import RecentIncomes from '../income/RecentIncomes';
import NeuMorph from '../common/NeuMorph';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import RecentList from '../common/RecentList';

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
    <SafeAreaView style={commonStyles.screen}>
      <StatusBar
        backgroundColor={colors.brand.brandLight}
        barStyle={'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        style={styles.quickMenuContainer}>
        <View style={commonStyles.container}>
          <AppHeader navigation={navigation} />
        </View>
        <SummaryList navigation={navigation} />
        <QuickMenu navigation={navigation} />
        <RecentList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quickMenuContainer: {
    backgroundColor: colors.brand.brandLight,
  },
});
