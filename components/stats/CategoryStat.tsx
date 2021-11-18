import React, {useMemo} from 'react';
import {ProgressBarAndroidBase, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {IStat} from '../database/common/StatsController';
import {colors, utils} from '../styles/theme';
import {THEME} from '../utils/Constants';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {isDate} from 'moment';
import IconMap from '../common/IconMap';
interface ICategoryStat {
  statlist: IStat[];
}
const CategoryStat = ({statlist}: ICategoryStat) => {
  const getProgress = (amount: number) => {
    const percentageRaw = (100 * amount) / total;
    const percentage = Math.round(percentageRaw * 100) / 100;
    const progress = percentageRaw / 100;
    return {percentage, progress};
  };

  const total = useMemo(() => {
    let total = 0;
    statlist.forEach((stat: IStat) => {
      total += stat.amount;
    });
    return total;
  }, [statlist]);
  return (
    <View style={styles.statContainer}>
      {statlist.map((stat: IStat, index: number) => {
        return (
          <View style={styles.barWrapper}>
            <View style={styles.barLabelWrapper}>
              <View style={styles.barLabelContainer}>
                <IconMap
                  style={styles.barIcon}
                  color={colors.theme[THEME].graphColorScheme[index]}
                  iconName={stat.transactionCategoryIcon}
                  size={24}
                />
                <Text style={styles.barLabel}>
                  {stat.transactionCategoryTitle}
                </Text>
              </View>
              <Text style={styles.barLabel}>
                {`${getProgress(stat.amount).percentage} %`}
              </Text>
            </View>
            <View style={styles.barContainer}>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={getProgress(stat.amount).progress}
                animating={true}
                style={styles.bar}
                color={colors.theme[THEME].graphColorScheme[index]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CategoryStat;

const styles = StyleSheet.create({
  statContainer: {
    display: 'flex',
    flex: 1,
    marginTop: 30,
  },
  barWrapper: {
    // padding
    paddingVertical: 10,
  },
  barLabel: {
    color: colors.theme[THEME].textDark,
    fontFamily: utils.fontFamily.Bold,
    fontSize: utils.fontSize.small,
  },
  barLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  barLabelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  barContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  barIcon: {
    marginRight: 4,
  },
  bar: {
    transform: [{scaleY: 5.0}],
  },
});
