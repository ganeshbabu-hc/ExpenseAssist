import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { G, Line, Rect } from 'react-native-svg';
import { PieChart, BarChart, XAxis, Grid } from 'react-native-svg-charts';
import AppHeader from '../common/AppHeader';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { getMonthlyStats, IStat } from '../database/common/StatsController';
import {
  ITransactionTypes,
  TransactionType,
} from '../transaction/TransactionTypes';
import CategoryStat from './CategoryStat';
import * as scale from 'd3-scale';
import { statsScreenStyle } from '../styles/commonStyles';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import t from '../common/translations/Translation';

const transactionTypes: ITransactionTypes[] = [
  {
    id: 1,
    label: t('Expense'),
    type: TransactionType.EXPENSE,
  },
  {
    id: 2,
    label: t('Income'),
    type: TransactionType.INCOME,
  },
];

const StatsScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const rotateVal = new Animated.Value(0);
  const styles = GetStyle(statsScreenStyle);
  const { commonStyles, colors } = GetTheme();
  const [slice, setSlice] = useState({
    label: '',
    value: 0,
    key: 0,
  });
  const [statList, setStatList] = useState<IStat[]>([]);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [data, setData] = useState<any[]>([]);
  const getStats = async () => {
    const statsList = await getMonthlyStats(type);

    const sorted = statsList.sort((stat1: IStat, stat2: IStat) => {
      if (stat1.amount > stat2.amount) {
        return -1;
      } else if (stat1.amount < stat2.amount) {
        return 1;
      }
      return 0;
    });
    setStatList(sorted);
  };
  const getGraphColor = (index: number) => {
    return colors.graphColorScheme[index];
  };

  const total = useMemo(() => {
    let total = 0;
    statList.forEach((stat: IStat) => {
      total += stat.amount;
    });
    return total;
  }, [statList]);

  const barData = useMemo(() => {
    let chartData: any = [];
    statList.forEach((stat: IStat) => {
      chartData.push({
        value: stat.amount,
        label: stat.transactionCategoryTitle,
      });
    });
    return chartData;
  }, [statList]);

  const updateChart = () => {
    const newData: any = [];
    statList.forEach((category: IStat, index: number) => {
      newData.push({
        amount: category.amount,
        name: category.transactionCategoryTitle,
        color: colors.graphColorScheme[index],
        legendFontSize: 15,
        legendFontColor: colors.graphColorScheme[index],

        key: category.transactionCategoryId,
        value: category.amount,
        svg: {
          fill: getGraphColor(index),
        },
        arc: {
          // outerRadius:
          //   slice.key === category.transactionCategoryId
          //     ? 120 + '%'
          //     : 100 + '%',
          outerRadius: '100%',
          // padAngle: slice.key === category.transactionCategoryId ? 0.1 : 0,
          padAngle: 0.03,
        },
        onPress: () => {
          setSlice({
            label: category.transactionCategoryTitle,
            value: category.amount,
            key: category.transactionCategoryId,
          });
          updateChart();
        },
      });
    });
    setData(newData);
  };

  const getStatsHandler = (type: TransactionType) => {
    setType(type);
    // }, 250);
    // rotateVal.setValue(0);
    // Animated.sequence([
    // ]).start();
  };
  Animated.timing(rotateVal, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }).start();

  const inActiveTypeSize = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: [styles.statTitle.fontSize, styles.statTitle.fontSize / 1.5],
  });

  const activeTypeSize = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: [styles.statTitle.fontSize / 1.5, styles.statTitle.fontSize],
  });

  const inActiveAmountSize = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: [
      styles.statSubTitle.fontSize,
      styles.statSubTitle.fontSize / 1.5,
    ],
  });

  const activeAmountSize = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: [
      styles.statSubTitle.fontSize / 1.5,
      styles.statSubTitle.fontSize,
    ],
  });

  const rotateInterpolate = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const animatedOpacity = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // const translateLabel = rotateVal.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [-100, 0],
  // });

  useEffect(() => {
    updateChart();
  }, [statList]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStats();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getStats();
  }, [type]);

  const Labels = ({ slices }: { slices?: any }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={pieCentroid[0]}
            y2={pieCentroid[1]}
            stroke={data.svg.fill}
          />
          <Rect
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            width={100}
            height={20}
            fill={'red'}
            rx="4"
          />
        </G>
      );
    });
  };

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title="Stats"
          scrollY={scrollY}
          backBtn={false}
        />
      </View>
      <View style={commonStyles.container}>
        {/* <View style={styles.tabWrapper}>
          <Pressable
            onPress={() => {
              getStatsHandler(TransactionType.INCOME);
            }}>
            <Animated.Text
              style={[
                styles.statTitle,
                {
                  // transform: [{translateX: translateLabel}],
                  fontSize:
                    type === TransactionType.INCOME
                      ? activeTypeSize
                      : inActiveTypeSize,
                  // opacity: animatedOpacity,
                },
              ]}>
              Income
            </Animated.Text>
            <Animated.Text
              style={[
                styles.statSubTitle,
                {
                  // transform: [{translateX: translateLabel}],
                  fontSize:
                    type === TransactionType.INCOME
                      ? activeAmountSize
                      : inActiveAmountSize,
                  // opacity: animatedOpacity,
                },
              ]}>
              {numberFormatter(total)}
            </Animated.Text>
          </Pressable>
          <Pressable
            onPress={() => {
              getStatsHandler(TransactionType.EXPENSE);
            }}>
            <Animated.Text
              style={[
                styles.statTitle,
                {
                  // transform: [{translateX: translateLabel}],
                  fontSize:
                    type === TransactionType.EXPENSE
                      ? activeTypeSize
                      : inActiveTypeSize,
                  // opacity: animatedOpacity,
                },
              ]}>
              Expense
            </Animated.Text>
            <Animated.Text
              style={[
                styles.statSubTitle,
                {
                  // transform: [{translateX: translateLabel}],
                  fontSize:
                    type === TransactionType.EXPENSE
                      ? activeAmountSize
                      : inActiveAmountSize,
                  // opacity: animatedOpacity,
                },
              ]}>
              {numberFormatter(total)}
            </Animated.Text>
          </Pressable>
        </View> */}
      </View>
      <ScrollViewWrapper scrollY={scrollY} style={commonStyles.container}>
        <View style={styles.chartContainer}>
          <Animated.View
            style={[
              styles.pieWrapper,
              {
                transform: [{ rotate: rotateInterpolate }],
                opacity: animatedOpacity,
              },
            ]}>
            <PieChart
              style={[styles.pie]}
              innerRadius={'40%'}
              outerRadius={'80%'}
              // labelRadius={80}
              data={data}>
              {/* <Labels /> */}
            </PieChart>
          </Animated.View>
          <View style={{ height: 200, padding: 20 }}>
            <BarChart
              style={styles.bar}
              data={barData}
              spacing={0.2}
              gridMin={0}
              svg={{ fill: colors.brandMedium }}
              yAccessor={({ item }) => item.value}
            />
            <XAxis
              style={{ marginTop: 10 }}
              data={barData}
              scale={scale.scaleBand}
              formatLabel={(value, index) => index}
              labelStyle={{ color: 'black' }}
            />
            <Grid direction={Grid.Direction.VERTICAL} />
          </View>
        </View>
        <CategoryStat statlist={statList} />
      </ScrollViewWrapper>
      <View style={commonStyles.bottomTabContainer}>
        {transactionTypes.map((transactionItem: ITransactionTypes) => {
          return (
            <Pressable
              key={`list-type-${transactionItem.id}`}
              onPress={() => {
                setType(transactionItem.type);
                // setTransactionType(transactionItem.type);
              }}
              style={commonStyles.bottomTab}>
              <Text
                style={[
                  type === transactionItem.type
                    ? commonStyles.bottomTabTextActive
                    : commonStyles.bottomTabText,
                ]}>
                {transactionItem.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default StatsScreen;
