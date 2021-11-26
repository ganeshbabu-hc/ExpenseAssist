import * as React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import t from '../common/translations/Translation';
import WeeklyView from '../common/WeeklyView';
import { GetTheme, GetStyle } from '../styles/GetThemeHook';
import { remindersScreenStyle } from '../styles/commonStyles';
import { useState } from 'react';

enum ReminderType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

interface IReminder {
  name: string;
  type: ReminderType;
}

const reminderTypes: IReminder[] = [
  {
    name: 'Daily',
    type: ReminderType.DAILY,
  },
  {
    name: 'Weekly',
    type: ReminderType.WEEKLY,
  },
  {
    name: 'Monthly',
    type: ReminderType.MONTHLY,
  },
];

const RemindersScreen = ({ navigation }: any) => {
  const { commonStyles, colors, formStyles } = GetTheme();
  const styles = GetStyle(remindersScreenStyle);
  const [reminderType, setReminderType] = useState<ReminderType>(
    ReminderType.DAILY,
  );

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('reminders')}
        />
        <View />
      </View>
      <View style={commonStyles.container}>
        <WeeklyView onChange={() => {}} />
        <View style={formStyles.inputWrapper}>
          <Text style={formStyles.inputLabel}>{t('repeat')}</Text>
          <View style={styles.repeatWrapper}>
            {reminderTypes.map((reminder: IReminder) => {
              return (
                <Pressable
                  style={[
                    styles.repeatType,
                    reminder.type === reminderType
                      ? styles.repeatTypeActive
                      : null,
                  ]}
                  onPress={() => {
                    setReminderType(reminder.type);
                  }}>
                  <Text
                    style={[
                      styles.repeatLabel,
                      reminder.type === reminderType
                        ? styles.repeatLabelActive
                        : null,
                    ]}>
                    {reminder.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View>
          <View style={formStyles.inputWrapper}>
            <Text style={formStyles.inputLabel}>{t('reminderName')}</Text>
            <TextInput
              multiline
              numberOfLines={4}
              // placeholder={t('description')}
              placeholderTextColor={colors.textCardGray}
              style={formStyles.input}
              // onChangeText={setDescription}
              // value={'description'}
            />
          </View>
        </View>
        <View style={formStyles.actionContainer}>
          <Pressable
            // activeOpacity={0.8}
            // extraButtonProps={{ rippleColor: 'red' }}
            // activeOpacity={0.6}
            style={[
              formStyles.button,
              formStyles.saveButton,
              formStyles.fullWidth,
            ]}
            onPress={() => {
              // saveEditTransactioneHandler();
            }}>
            <Text style={formStyles.buttonLabel}>{t('add')}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RemindersScreen;
