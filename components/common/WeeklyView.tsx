import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors, commonStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {DATE_DB_FORMAT, DAYS_SHORT, MONTH_NAMES} from '../utils/Constants';
import {dateFormatter} from '../utils/Formatter';
import moment from 'moment';

interface IWeeklyView {
  onChange: Function;
  defaultValue?: string;
}

const WeeklyView = ({onChange, defaultValue}: IWeeklyView) => {
  const [date, setDate] = useState(() => {
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
    const todayDate = new Date(selectedDate);
    const todayNumber = selectedDate.getDay();
    const daysList: Date[] = [];
    for (let i = 0; i <= 6; i++) {
      daysList.push(
        new Date(todayDate.setDate(selectedDate.getDate() - todayNumber + i)),
      );
    }
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
            <Icon
              name="calendar-month"
              size={commonStyles.icon.width}
              color={colors.brand.brandMedium}
            />
            <Text style={styles.btnText}>{`${
              MONTH_NAMES[date.getMonth()]
            } ${date.getFullYear()}`}</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={showTimepicker} style={styles.timeBtn}>
            <Text style={styles.btnText}>{`${formatTime()}`}</Text>
            <Icon
              style={styles.timeIon}
              name="clock-time-five"
              size={commonStyles.icon.width}
              color={colors.brand.brandMedium}
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
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
  },
  dateBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIon: {
    marginLeft: 10,
  },
  btnText: {
    color: colors.black,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
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
    fontSize: utils.fontSize.small,
    color: colors.grayCardText,
    fontFamily: utils.fontFamily.Bold,
  },
  dayNumberWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 40,
    height: 40,
    marginTop: 10,
    active: {
      color: colors.white,
      backgroundColor: colors.brand.brandMedium,
    },
  },
  dayNumber: {
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    color: colors.black,
  },
});

export default WeeklyView;
