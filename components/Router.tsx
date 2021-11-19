import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import CommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { HomeScreen, ProfileScreen } from './home/HomeScreen';
import { StyleSheet, View } from 'react-native';
import Add from './home/Add';
import AddEditExpense from './expense/AddEditExpense';
import { colors } from './styles/theme';
import AddType from './common/add/AddType';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getTransactionCategories,
  getTransactions,
} from './transaction/TransactionController';
import {
  UPDATE_CONFIGURATIONS,
  UPDATE_EXPENSE_CATEGORIES_LIST,
  UPDATE_INCOME_CATEGORIES_LIST,
  UPDATE_TRANSACTION_LIST,
  UPDATE_SUMMARY,
} from '../redux/constants/StoreConstants';
import { getCurrncyTypes } from './database/common/CurrencyController';
import AddEditIncome from './income/AddEditIncome';
import { getIncomes } from './database/income/IncomeController';
import { getSummary } from './database/common/SummaryController';
import StatsScreen from './home/StatsScreen2';
import AddEditCategory from './common/AddEditCategory';
import { BlurView } from '@react-native-community/blur';
import StatsScreen1 from './stats/StatsScreen';
import TransactionList from './transaction/TransactionList';
import { SettingsScreen } from './settings/SettingsScreen';
import CurrencyScreen from './settings/CurrencyScreen';
import { getConfigurations } from './database/common/CommonController';
import ThemeScreen from './settings/ThemeScreen';
import { THEME } from './utils/Constants';
import { TransactionType } from './transaction/TransactionTypes';
import UniconHome from './icons/unicons/UniconHome';
import UniconPieAlt from './icons/unicons/UniconPieAlt';
import UniconSetting from './icons/unicons/UniconSetting';
import UniconUnivercity from './icons/unicons/UniconUnivercity';
import { AccountsScreen } from './settings/AccountsScreen';
import AddEditTransaction from './transaction/AddEditTransaction';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

enum Routes {
  HOME = 'home',
  STATS = 'stats',
  ADD = 'add',
  ACCOUNTS = 'accounts',
  SETTINGS = 'settings',
}
// tabBarBackground: () => (
//   <BlurView
//     blurType="light"
//     blurAmount={10}
//     reducedTransparencyFallbackColor="white"
//     style={StyleSheet.absoluteFill}
//   />
// ),
const Home = ({ navigation }) => {
  return (
    <View style={styles.appContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          lazy: true,
          headerShown: false,
          tabBarStyle: {
            height: 64,
            borderTopWidth: 0,
            shadowcolor: colors.theme[THEME].textBrandMedium,
            elevation: 20,
            shadowOffset: {
              width: 20,
              height: 20,
            },
            shadowOpacity: 1,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case Routes.HOME:
                iconName = (
                  <UniconHome
                    active={focused}
                    color={
                      focused
                        ? colors.theme[THEME].textBrandMedium
                        : colors.theme[THEME].textCardGray
                    }
                  />
                );
                break;
              case Routes.STATS:
                iconName = (
                  <UniconPieAlt
                    color={
                      focused
                        ? colors.theme[THEME].textBrandMedium
                        : colors.theme[THEME].textCardGray
                    }
                  />
                );
                break;
              case Routes.ADD:
                iconName = 'add';
                break;
              case Routes.ACCOUNTS:
                iconName = (
                  <UniconUnivercity
                    color={
                      focused
                        ? colors.theme[THEME].textBrandMedium
                        : colors.theme[THEME].textCardGray
                    }
                  />
                );
                break;
              case Routes.SETTINGS:
                iconName = (
                  <UniconSetting
                    color={
                      focused
                        ? colors.theme[THEME].textBrandMedium
                        : colors.theme[THEME].textCardGray
                    }
                  />
                );
                break;
              default:
                break;
            }
            // You can return any component that you like here!
            if (Routes.ADD === route.name) {
              return <Add navigation={navigation} />;
            } else {
              return iconName;
            }
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'transparent',
        })}>
        <Tab.Screen
          name={Routes.HOME}
          component={HomeScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name={Routes.STATS} component={StatsScreen1} />
        <Tab.Screen name={Routes.ACCOUNTS} component={AccountsScreen} />
        <Tab.Screen name={Routes.SETTINGS} component={SettingsScreen} />
        <Tab.Screen name={Routes.ADD} component={HomeScreen} />
      </Tab.Navigator>
    </View>
  );
};

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Router = () => {
  const dispatch = useDispatch();
  const intializeStore = async () => {
    // const transactioList = await getTransactions(10, TransactionType.ALL);
    // dispatch({ type: UPDATE_TRANSACTION_LIST, payload: transactioList });
    // const summary = await getSummary();
    // dispatch({ type: UPDATE_SUMMARY, payload: summary });
    // const incomeList = await getIncomes();
    // dispatch({ type: UPDATE_TRANSACTION_LIST, payload: incomeList });
    const configs = await getConfigurations();
    dispatch({ type: UPDATE_CONFIGURATIONS, payload: configs });
    // const expenseCategories = await getTransactionCategories(
    //   TransactionType.EXPENSE,
    // );
    // dispatch({
    //   type: UPDATE_EXPENSE_CATEGORIES_LIST,
    //   payload: expenseCategories,
    // });
    // const incomeCategories = await getTransactionCategories(
    //   TransactionType.INCOME,
    // );
    // dispatch({
    //   type: UPDATE_INCOME_CATEGORIES_LIST,
    //   payload: incomeCategories,
    // });
    // const currencyList = await getConfigurations();
    // dispatch({type: UPDATE_CURRENCY_TYPES, payload: configs});
  };
  useEffect(() => {
    intializeStore();
  }, []);
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.theme[THEME].bgLight,
          background: colors.theme[THEME].bgLight,
          card: colors.theme[THEME].bgLight,
          text: colors.theme[THEME].bgLight,
          border: colors.theme[THEME].bgLight,
          notification: colors.theme[THEME].bgLight,
        },
      }}>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          contentStyle: { backgroundColor: colors.theme[THEME].brandDanger },

          // headerBackButtonMenuEnabled: true,
        })}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="AddType" component={AddType} />
        <Stack.Screen
          name="AddTransaction"
          component={AddEditTransaction}
          initialParams={{}}
        />
        <Stack.Screen
          name="AddEditCategory"
          component={AddEditCategory}
          initialParams={{}}
        />
        <Stack.Screen
          name="TransactionList"
          component={TransactionList}
          initialParams={{}}
        />
        <Stack.Group>
          <Stack.Screen
            name="CurrencyScreen"
            component={CurrencyScreen}
            initialParams={{}}
          />
          <Stack.Screen
            name="ThemeScreen"
            component={ThemeScreen}
            initialParams={{}}
          />
        </Stack.Group>
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
