import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors, commonStyles, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {DAYS, DAYS_SHORT, monthNames} from '../utils/Constants';
import {dateFormatter} from '../utils/Formatter';

const WeeklyView = ({onChange}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const onDateChange = (event: Event, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      console.log(selectedDate);
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
    const todayDate = new Date(selectedDate);
    const todayNumber = selectedDate.getDay();
    const daysList: Date[] = [];
    for (let i = 0; i <= 6; i++) {
      daysList.push(
        new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + i)),
      );
    }
    console.log(daysList);
    return daysList;
    // new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + 2)),
    // new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + 3)),
    // new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + 4)),
    // new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + 5)),
    // new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + 6)),
    // new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + 7)),
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
        <Pressable onPress={showDatepicker} style={styles.dateBtn}>
          <Icon
            name="calendar-month"
            size={commonStyles.icon.width}
            color={colors.brandMedium}
          />
          <Text style={styles.btnText}>{`${
            monthNames[date.getMonth()]
          } ${date.getFullYear()}`}</Text>
        </Pressable>
        <Pressable onPress={showTimepicker} style={styles.dateBtn}>
          <Icon
            name="clock-time-five"
            size={commonStyles.icon.width}
            color={colors.brandMedium}
          />
          <Text style={styles.btnText}>{`${formatTime()}`}</Text>
        </Pressable>
        <View />
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

const styles = StyleSheet.create({
  dateWrapper: {
    display: 'flex',
    overflow: 'scroll',
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
    minHeight: 100,
    marginBottom: 10,
  },
  dateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  btnText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  daysContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  day: {
    marginVertical: 20,
  },
  dayName: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayCardText,
  },
  dayNumberWrapper: {
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 40,
    height: 40,
    marginTop: 10,
    active: {
      color: colors.white,
      backgroundColor: colors.brandMedium,
    },
  },
  dayNumber: {
    fontSize: 18,
    color: colors.black,
  },
});

export default WeeklyView;
