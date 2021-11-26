import * as React from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppHeader from '../common/AppHeader';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SummaryList from './SummaryList';
import QuickMenu from './QuickMenu';
import TransactionList from '../transaction/TransactionList';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { THEME } from '../utils/Constants';
import { useRef } from 'react';
import { TransactionType } from '../transaction/TransactionTypes';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { homeScreenStyles } from '../styles/commonStyles';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

export const ProfileScreen = ({ route }: any) => {
  return <Text>This is me</Text>;
};

export const HomeScreen = ({ navigation }: any) => {
  const { commonStyles } = GetTheme();
  const styles = GetStyle(homeScreenStyles);
  const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader navigation={navigation} scrollY={scrollY} />
      </View>
      <ScrollViewWrapper scrollY={scrollY} style={styles.quickMenuContainer}>
        <SummaryList navigation={navigation} />
        <QuickMenu navigation={navigation} />
        <TransactionList
          navigation={navigation}
          type={TransactionType.ALL}
          limit={5}
        />
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};


