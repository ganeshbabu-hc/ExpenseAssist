import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DATE_DB_FORMAT, DAYS_SHORT, MONTH_NAMES } from '../utils/Constants';
import { dateFormatter } from '../utils/Formatter';
import moment from 'moment';
import IconMap from './IconMap';
import { GetTheme } from '../styles/GetThemeHook';
import { weeklyCalendarStyles } from '../styles/commonStyles';

interface IWeeklyView {
  onChange: Function;
  defaultValue?: string;
}

const WeeklyView = ({ onChange, defaultValue }: IWeeklyView) => {
  const { colors, styles, commonStyles } = GetTheme(weeklyCalendarStyles);

  const [date, setDate] = useState(() => {
    if (!defaultValue) {
      return moment(new Date(), DATE_DB_FORMAT).toDate();
    }
    return moment(defaultValue, DATE_DB_FORMAT).toDate();
  });
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const onDateChange = (event: Event, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = dateFormatter(selectedDate);
      onChange(formattedDate);
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const daysInWeek = (selectedDate: Date): Date[] => {
    const todayNumber = selectedDate.getTime();
    const daysList: Date[] = [];
    for (let i = -3; i <= 3; i++) {
      daysList.push(new Date(todayNumber + i * 24 * 60 * 60 * 1000));
    }
    console.log(daysList);

    return daysList;
  };

  const formatTime = () => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let strTime =
      hours + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;
    return strTime;
  };

  return (
    <View style={styles.dateWrapper}>
      <View style={styles.dateHeader}>
        <View>
          <Pressable onPress={showDatepicker} style={styles.dateBtn}>
            <IconMap
              name={'calendar'}
              size={commonStyles.icon.width}
              color={colors.textBrandMedium}
            />
            <Text style={styles.btnText}>{`${
              MONTH_NAMES[date.getMonth()]
            } ${date.getFullYear()}`}</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={showTimepicker} style={styles.timeBtn}>
            <Text style={styles.btnText}>{`${formatTime()}`}</Text>
            <IconMap
              style={styles.timeIon}
              name={'clock'}
              size={commonStyles.icon.width}
              color={colors.textBrandMedium}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.daysContainer}>
        {daysInWeek(date).map((weekDay: Date, index: number) => {
          return (
            <View key={`week-${index}`} style={styles.day}>
              <Text style={styles.dayName}>{DAYS_SHORT[weekDay.getDay()]}</Text>
              <Pressable
                onPress={showDatepicker}
                style={[
                  styles.dayNumberWrapper,
                  weekDay.getDate() === date.getDate()
                    ? styles.dayNumberWrapper.active
                    : {},
                ]}>
                <Text
                  style={[
                    styles.dayNumber,
                    weekDay.getDate() === date.getDate()
                      ? styles.dayNumberWrapper.active
                      : {},
                  ]}>
                  {weekDay.getDate()}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      {show && (
        <DateTimePicker
          themeVariant="light"
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};
export default WeeklyView;
