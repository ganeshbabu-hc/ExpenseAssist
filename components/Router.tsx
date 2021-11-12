import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import CommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {HomeScreen, ProfileScreen} from './home/HomeScreen';
import {StyleSheet, View} from 'react-native';
import Add from './home/Add';
import AddEditExpense from './expense/AddEditExpense';
import {colors} from './styles/theme';
import AddType from './common/add/AddType';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  getExpenseCaetegories,
  getExpenses,
} from './database/expense/ExpenseController';
import {
  UPDATE_CONFIGURATIONS,
  UPDATE_CURRENCY_TYPES,
  UPDATE_EXPENSE_CATEGORIES_LIST,
  UPDATE_EXPENSE_LIST,
  UPDATE_INCOME_CATEGORIES_LIST,
  UPDATE_INCOME_LIST,
  UPDATE_SUMMARY,
} from '../redux/constants/StoreConstants';
import {getCurrncyTypes} from './database/common/CurrencyController';
import AddEditIncome from './income/AddEditIncome';
import {
  getIncomeCaetegories,
  getIncomes,
} from './database/income/IncomeController';
import {getSummary} from './database/common/SummaryController';
import StatsScreen from './home/StatsScreen';
import AddEditCategory from './common/AddEditCategory';
import {BlurView} from '@react-native-community/blur';
import StatsScreen1 from './home/StatsScreen1';
import RecentList from './common/RecentList';
import {SettingsScreen} from './settings/SettingsScreen';
import CurrencyScreen from './settings/CurrencyScreen';
import {getConfigurations} from './database/common/CommonController';
import ThemeScreen from './settings/ThemeScreen';
import {THEME} from './utils/Constants';
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
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          lazy: true,
          headerShown: false,
          tabBarStyle: {
            height: 64,
            borderTopWidth: 0,
            shadowColor: colors.theme[THEME].brandMedium,
            elevation: 20,
            shadowOffset: {
              width: 20,
              height: 20,
            },
            shadowOpacity: 1,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case Routes.HOME:
                iconName = (
                  <CommunityIcon
                    name={'home-outline'}
                    color={
                      focused
                        ? colors.theme[THEME].brandDark
                        : colors.theme[THEME].textCardGray
                    }
                    size={28}
                  />
                );
                break;
              case Routes.STATS:
                iconName = (
                  <CommunityIcon
                    name={'chart-arc'}
                    color={
                      focused
                        ? colors.theme[THEME].brandDark
                        : colors.theme[THEME].textCardGray
                    }
                    size={28}
                  />
                );
                break;
              case Routes.ADD:
                iconName = 'add';
                break;
              case Routes.ACCOUNTS:
                iconName = (
                  <CommunityIcon
                    name={'bank-outline'}
                    color={
                      focused
                        ? colors.theme[THEME].brandDark
                        : colors.theme[THEME].textCardGray
                    }
                    size={28}
                  />
                );
                break;
              case Routes.SETTINGS:
                iconName = (
                  <Icon
                    name={'settings'}
                    color={
                      focused
                        ? colors.theme[THEME].brandDark
                        : colors.theme[THEME].textCardGray
                    }
                    size={28}
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
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen name={Routes.STATS} component={StatsScreen1} />
        <Tab.Screen name={Routes.ACCOUNTS} component={ProfileScreen} />
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
    const expenseList = await getExpenses();
    dispatch({type: UPDATE_EXPENSE_LIST, payload: expenseList});
    const summary = await getSummary();
    dispatch({type: UPDATE_SUMMARY, payload: summary});
    const incomeList = await getIncomes();
    dispatch({type: UPDATE_INCOME_LIST, payload: incomeList});
    const configs = await getConfigurations();
    dispatch({type: UPDATE_CONFIGURATIONS, payload: configs});
    const expenseCategories = await getExpenseCaetegories();
    dispatch({
      type: UPDATE_EXPENSE_CATEGORIES_LIST,
      payload: expenseCategories,
    });
    const incomeCategories = await getIncomeCaetegories();
    dispatch({
      type: UPDATE_INCOME_CATEGORIES_LIST,
      payload: incomeCategories,
    });
    // const currencyList = await getConfigurations();
    // dispatch({type: UPDATE_CURRENCY_TYPES, payload: configs});
  };
  useEffect(() => {
    intializeStore();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          // headerBackButtonMenuEnabled: true,
        })}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          // options={{
          //   transitionSpec: {
          //     open: config,
          //     close: config,
          //   },
          // }}
          name="AddType"
          component={AddType}
        />
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
