import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { HomeScreen } from './home/HomeScreen';
import { StyleSheet, View } from 'react-native';
import Add from './home/Add';
import { colors } from './styles/theme';
import AddType from './common/add/AddType';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddEditCategory from './common/AddEditCategory';
import StatsScreen1 from './stats/StatsScreen';
import TransactionList from './transaction/TransactionList';
import { SettingsScreen } from './settings/SettingsScreen';
import CurrencyScreen from './settings/CurrencyScreen';
import ThemeScreen from './settings/ThemeScreen';
import { THEME } from './utils/Constants';
import { AccountsScreen } from './settings/AccountsScreen';
import AddEditTransaction from './transaction/AddEditTransaction';
import IconMap from './common/IconMap';
import ImageView from './common/ImageViewer';
import TransactionSearch from './transaction/TransactionSearch';
import RemindersScreen from './settings/RemindersScreen';
import CategoriesScreen from './settings/CategoriesScreen';
const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();
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
            shadowcolor: colors.theme[THEME].shadowBrandMedium,
            elevation: 20,
            shadowOffset: {
              width: 20,
              height: 20,
            },
            shadowOpacity: 1,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            switch (route.name) {
              case Routes.HOME:
                iconName = 'home';
                break;
              case Routes.STATS:
                iconName = 'pie';
                break;
              case Routes.ADD:
                iconName = 'add';
                break;
              case Routes.ACCOUNTS:
                iconName = 'univercity';
                break;
              case Routes.SETTINGS:
                iconName = 'gear';
                break;
              default:
                break;
            }
            // You can return any component that you like here!
            if (Routes.ADD === route.name) {
              return <Add navigation={navigation} />;
            } else {
              return (
                <IconMap
                  name={iconName}
                  size={28}
                  color={
                    focused
                      ? colors.theme[THEME].textBrandMedium
                      : colors.theme[THEME].textCardGray
                  }
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
    // const configs = await getConfigurations();
    // dispatch({ type: UPDATE_CONFIGURATIONS, payload: configs });
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
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.theme[THEME].brandDanger,
          },

          // headerBackButtonMenuEnabled: true,
        })}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="AddType" component={AddType} />

        <Stack.Screen
          name="TransactionList"
          component={TransactionList}
          initialParams={{}}
        />
        <Stack.Group>
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
            name="ImageView"
            component={ImageView}
            initialParams={{}}
          />
          <Stack.Screen
            name="TransactionSearch"
            component={TransactionSearch}
            initialParams={{}}
          />
          <Stack.Screen
            name="Reminders"
            component={RemindersScreen}
            initialParams={{}}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="CategoriesScreen"
            component={CategoriesScreen}
            initialParams={{}}
          />
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
