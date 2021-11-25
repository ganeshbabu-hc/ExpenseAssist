import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import AppModal from './components/common/modal/AppModal';
import { getDBConnection } from './components/database/DBController';
import Router from './components/Router';
import configureStore from './redux/store/ConfigureStore';
// import 'react-native-gesture-handler';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

import Notification from './components/common/ToastNotification';
import { LogBox, StyleSheet, View } from 'react-native';
import {
  createImageTable,
  getConfigurations,
} from './components/database/common/CommonController';
import { UPDATE_CONFIGURATIONS } from './redux/constants/StoreConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTheme } from './components/utils/Constants';
import { addReminder } from './services/Reminders';

// console.disableYellowBox = true;
LogBox.ignoreLogs(['VirtualizedLists']); // Ignore log notification by message
// LogBox.ignoreAllLogs(true); //Ignore all log notifications
// import {enableFreeze} from 'react-native-screens';
// enableFreeze(true);
// TODO: Remove when fixed

const AppWrapper = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  getDBConnection();
  getConfigurations();

  const setConfigs = async () => {
    try {
      const configs = await getConfigurations();
      //   await AsyncStorage.setItem('@themekey', 'purple');
      //   const result = await AsyncStorage.getItem('@themekey');
      //   console.log('--themekey--', result);
      //   setTheme(result ?? 'purple');
      dispatch({ type: UPDATE_CONFIGURATIONS, payload: configs });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // setTheme();

  useEffect(() => {
    // addColumn();
    // setTheme();
    // resetDatabase();
    // Reminders.requestPermission();

    // Get reminders

    // Reminders.addReminder({
    //   title: 'Wake-up reminder',
    //   note: 'Wake-up and have breakfast!',
    //   timestamp: Date.now() + 1000 * 5, // next five minutes from current time (milliseconds)
    // });
    setTimeout(async () => {
      // addReminder();
      // Constants.THEME = 'purple';
      // Request permission
      // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
      // Notifications.schduleNotification(new Date());
      // Add reminder
      // const remainers = await Reminders.getReminders();
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
      // trucateTable();
      // createImageTable();
    }, 1000);
    setConfigs();
  }, []);
  return (
    <React.Fragment>
      <Notification />
      {!loading && <Router />}
      <AppModal />
    </React.Fragment>
  );
};

export default AppWrapper;
