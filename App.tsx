import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppModal from './components/common/modal/AppModal';
import {getDBConnection} from './components/database/DBController';
import Router from './components/Router';
import configureStore from './redux/store/ConfigureStore';
import Notifications from './services/Notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Reminders from '@wiicamp/react-native-reminders';
const store = configureStore();

const App = () => {
  getDBConnection();

  useEffect(() => {
    Reminders.requestPermission();

    // Get reminders

    // Reminders.addReminder({
    //   title: 'Wake-up reminder',
    //   note: 'Wake-up and have breakfast!',
    //   timestamp: Date.now() + 1000 * 5, // next five minutes from current time (milliseconds)
    // });
    setTimeout(async () => {
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
