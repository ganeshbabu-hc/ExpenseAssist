import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {HomeScreen, ProfileScreen} from './home/HomeScreen';
import {StyleSheet, View} from 'react-native';
import Add from './home/Add';
import AddEditExpense from './expense/AddEditExpense';
import {colors} from './styles/theme';
import AddType from './common/add/AddType';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getExpenses} from './database/expense/ExpenseController';
import {
  UPDATE_CURRENCY_TYPES,
  UPDATE_EXPENSE_LIST,
  UPDATE_INCOME_LIST,
  UPDATE_SUMMARY,
} from '../redux/constants/StoreConstants';
import {getCurrncyTypes} from './database/common/CurrencyController';
import AddEditIncome from './income/AddEditIncome';
import {getIncomes} from './database/income/IncomeController';
import {getSummary} from './database/common/SummaryController';
import StatsScreen from './home/StatsScreen';
import AddEditCategory from './common/AddEditCategory';
import {BlurView} from '@react-native-community/blur';
import StatsScreen1 from './home/StatsScreen1';
import RecentList from './common/RecentList';
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
const Home = ({navigation}) => {
  return (
    <View style={styles.appContainer}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          lazy: true,
          headerShown: false,
          tabBarStyle: {
            height: 60,
            borderTopWidth: 0,
            shadowColor: colors.brand.brandLight,
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
                  color={focused ? colors.brand.brandDark : colors.grayCardText}
                  size={28}
                />
              );
            }
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'transparent',
        })}>
        <Tab.Screen
          name={Routes.HOME}
          component={HomeScreen}
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen name={Routes.STATS} component={StatsScreen1} />
        <Tab.Screen name={Routes.ACCOUNTS} component={ProfileScreen} />
        <Tab.Screen name={Routes.SETTINGS} component={ProfileScreen} />
        <Tab.Screen name={Routes.ADD} component={HomeScreen} />
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
          headerBackButtonMenuEnabled: true,
        })}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="AddType" component={AddType} />
        <Stack.Screen
          name="AddExpense"
          component={AddEditExpense}
          initialParams={{}}
        />
        <Stack.Screen
          name="AddIncome"
          component={AddEditIncome}
          initialParams={{}}
        />
        <Stack.Screen
          name="AddEditCategory"
          component={AddEditCategory}
          initialParams={{}}
        />
        <Stack.Screen
          name="RecentList"
          component={RecentList}
          initialParams={{}}
        />
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
