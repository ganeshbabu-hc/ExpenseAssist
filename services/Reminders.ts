import Reminders from '@wiicamp/react-native-reminders';
// Request permission
Reminders.requestPermission();

export const addReminder = () => {
  // Add reminder
  Reminders.addReminder({
    title: 'Wake-up reminder',
    note: 'Wake-up and have breakfast!',
    timestamp: Date.now() + 1000 * 5, // next five minutes from current time (milliseconds)
  });
  //   Reminders.removeReminder('the-reminder-id');
};

export const removeReminder = () => {
  Reminders.removeReminder('the-reminder-id');
};
