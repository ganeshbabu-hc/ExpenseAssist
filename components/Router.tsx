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
import AddType from './common/add/AddType';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getExpenses} from './database/expense/ExpenseController';
import {UPDATE_CURRENCY_TYPES, UPDATE_EXPENSE_LIST, UPDATE_INCOME_LIST, UPDATE_SUMMARY} from '../redux/constants/StoreConstants';
import { getCurrncyTypes } from './database/common/CurrencyController';
import color from 'material-ui-colors/dist/amber';
import AddIncome from './income/AddIncome';
import { getIncomes } from './database/income/IncomeController';
import { getSummary } from './database/common/SummaryController';
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
          tabBarStyle: {
            height: 70,
            backgroundColor: colors.gray50,
            elevation: 0,
          },
          tabBarShowLabel: false,
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
  const dispatch = useDispatch();
  const intializeStore = async () => {
    const expenseList = await getExpenses();
    dispatch({type: UPDATE_EXPENSE_LIST, payload: expenseList});
    const summary = await getSummary();
    dispatch({type: UPDATE_SUMMARY, payload: summary});
    const incomeList = await getIncomes();
    dispatch({type: UPDATE_INCOME_LIST, payload: incomeList});
    const currencyList = await getCurrncyTypes();
    dispatch({type: UPDATE_CURRENCY_TYPES, payload: currencyList});
  };
  useEffect(() => {
    intializeStore();
  }, []);
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
        <Stack.Screen name="AddType" component={AddType} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="AddIncome" component={AddIncome} />
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
