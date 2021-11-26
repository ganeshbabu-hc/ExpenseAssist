import React, { useMemo } from 'react';
import { Animated, Text, View } from 'react-native';
import { IStat } from '../database/common/StatsController';
import { THEME } from '../utils/Constants';
import IconMap from '../common/IconMap';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { categoryStatStyle } from '../styles/commonStyles';
interface ICategoryStat {
  statlist: IStat[];
}

const CategoryStat = ({ statlist }: ICategoryStat) => {
  const styles = GetStyle(categoryStatStyle);
  const { colors } = GetTheme();

  const getProgress = (amount: number) => {
    const percentageRaw = (100 * amount) / total;
    const percentage = Math.round(percentageRaw * 100) / 100;
    const progress = percentageRaw;
    return { percentage, progress };
  };

  const total = useMemo(() => {
    let totalVal = 0;
    statlist.forEach((stat: IStat) => {
      totalVal += stat.amount;
    });
    return totalVal;
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
                  color={colors.textBrandLightMedium}
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
  const styles = GetStyle(categoryStatStyle);
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
