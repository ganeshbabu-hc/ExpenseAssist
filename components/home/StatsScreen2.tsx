import {deepPurple} from 'material-ui-colors';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getMonthlyStats} from '../database/common/StatsController';
import { TransactionType } from '../transaction/TransactionTypes';
import {colors, commonStyles, utils} from '../styles/theme';
import { THEME } from '../utils/Constants';
// import PieChart from 'react-native-d3-charts';

const chartData = [
  {
    value: 61.41,
    startColor: '#7CB5EC',
    endColor: '#7CB5EC',
    label: 'Chrome',
    labelStyle: {},
  },
  {
    value: 11.84,
    startColor: '#434348',
    endColor: '#434348',
    label: 'Internet Explorer',
    labelStyle: {},
  },
  {
    value: 10.85,
    startColor: '#90ED7D',
    endColor: '#90ED7D',
    label: 'Firefox',
    labelStyle: {},
  },
  {
    value: 4.67,
    startColor: '#F7A25D',
    endColor: '#F7A25D',
    label: 'Edge',
    labelStyle: {},
  },
  {
    value: 4.18,
    startColor: '#8085E9',
    endColor: '#8085E9',
    label: 'Safari',
    labelStyle: {},
  },
  {
    value: 7.05,
    startColor: '#F15C80',
    endColor: '#F15C80',
    label: 'Other',
    labelStyle: {},
  },
];

const StatsScreen = ({route}: any) => {
  const [type, setType] = useState(TransactionType.EXPENSE);
  const [data, setData] = useState([]);
  const getStats = async () => {
    const statList = await getMonthlyStats(type);
    const newData: any = [];
    statList.forEach((category: any, index: number) => {
      newData.push({
        amount: category.amount,
        name: category.transactionCategoryTitle,
        color: deepPurple[(index + 1) * 100],
        legendFontSize: 15,
        legendFontColor: deepPurple[(index + 1) * 100],
      });
    });
    setData(newData);
    // console.log(newData);
  };
  useEffect(() => {
    getStats();
  }, [type]);
  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}>
        {/* <PieChart
          size={{height: 300, width: 300}}
          data={chartData}
          title="Browser market shares in January, 2018"
        /> */}
      </ScrollView>
      <View style={styles.typeWrapper}>
        <Pressable
          style={styles.typeBtn}
          onPress={() => {
            setType(TransactionType.EXPENSE);
          }}>
          <Text style={styles.typeBtnText}>Expense</Text>
        </Pressable>
        <Pressable
          style={styles.typeBtn}
          onPress={() => {
            setType(TransactionType.INCOME);
          }}>
          <Text style={styles.typeBtnText}>Income</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  typeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  typeBtnText: {
    color: colors.theme[THEME].textLight,
  },
  typeBtn: {
    padding: 20,
    backgroundColor: colors.theme[THEME].brandMedium,
    borderRadius: utils.inputRadius,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default StatsScreen;
