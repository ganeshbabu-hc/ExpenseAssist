import React, { useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { IStat } from '../database/common/StatsController';
import { colors, utils } from '../styles/theme';
import { THEME } from '../utils/Constants';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import IconMap from '../common/IconMap';
interface ICategoryStat {
  statlist: IStat[];
}

const CategoryStat = ({ statlist }: ICategoryStat) => {
  const getProgress = (amount: number) => {
    const percentageRaw = (100 * amount) / total;
    const percentage = Math.round(percentageRaw * 100) / 100;
    const progress = percentageRaw;
    return { percentage, progress };
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
          <View key={`category-stat-${index}`} style={styles.barWrapper}>
            <View style={styles.barLabelWrapper}>
              <View style={styles.barLabelContainer}>
                <IconMap
                  style={styles.barIcon}
                  color={colors.theme[THEME].graphColorScheme[index]}
                  name={stat.transactionCategoryIcon}
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
            <ProgressWrapper
              progress={getProgress(stat.amount).progress}
              index={index}
            />
          </View>
        );
      })}
    </View>
  );
};

const ProgressWrapper = ({
  progress,
  index,
}: {
  progress: number;
  index: number;
}) => {
  const animatedValue = new Animated.Value(0);
  const progressValue = animatedValue?.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${progress}%`],
    extrapolate: 'clamp',
  });

  Animated.timing(animatedValue, {
    useNativeDriver: false,
    toValue: 1,
    delay: index * 50,
    duration: 600,
  }).start();
  return (
    <View style={styles.barContainer}>
      <Animated.View style={[styles.bar, { width: progressValue }]} />
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
    flex: 1,
    backgroundColor: colors.theme[THEME].brandLightMedium,
    height: 14,
    borderRadius: 30,
    marginTop: 6,
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 30,
    flex: 1,
    height: '100%',
    width: 20,
    backgroundColor: colors.theme[THEME].brandMedium,
    // transform: [{ scaleY: 5.0 }],
  },
  barIcon: {
    marginRight: 4,
  },
});
