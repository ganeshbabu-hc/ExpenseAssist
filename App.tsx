import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppModal from './components/common/modal/AppModal';
import {getDBConnection} from './components/database/DBController';
import Router from './components/Router';
import configureStore from './redux/store/ConfigureStore';
import Notifications from './services/Notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Reminders from '@wiicamp/react-native-reminders';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createConfigTable,
  dropTables,
  getConfigurations,
  insertStatements,
  resetDatabase,
} from './components/database/common/CommonController';
import {LogBox} from 'react-native';
import * as Constants from './components/utils/Constants';
import { setTheme } from './components/utils/Constants';
// TODO: Remove when fixed
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead',
]);

const store = configureStore();

const App = () => {
  getDBConnection();
  setTheme();

  useEffect(() => {
    setTheme();
    // resetDatabase();
    // Reminders.requestPermission();

    // Get reminders

    // Reminders.addReminder({
    //   title: 'Wake-up reminder',
    //   note: 'Wake-up and have breakfast!',
    //   timestamp: Date.now() + 1000 * 5, // next five minutes from current time (milliseconds)
    // });
    setTimeout(async () => {
      // Constants.THEME = 'purple';
      // Request permission
      // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
      // Notifications.schduleNotification(new Date());
      // Add reminder
      // const remainers = await Reminders.getReminders();
      // console.log(remainers);
      //       Reminders.requestPermission();
      // // Get reminders
      // Reminders.getReminders();
      // // Add reminder
      // Reminders.addReminder({
      //   title: 'Wake-up reminder',
      //   note: 'Wake-up and have breakfast!',
      //   timestamp: Date.now() * 60000 * 5, // next five minutes from current time (milliseconds)
      // });
      // // Remove reminder
      // Reminders.removeReminder('the-reminder-id');
      // dropTables();
      // createConfigTable();
      // insertStatements();
      // resetDatabase();
      // const result = await getConfigurations();
      // console.log(result);
    }, 1000);
  }, []);
  return (
    <Provider store={store}>
      <Router />
      <AppModal />
    </Provider>
  );
};

export default App;
