import {deepPurple} from 'material-ui-colors';
import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions, Pressable, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {getMonthlyStats} from '../database/common/StatsController';
import {colors, utils} from '../styles/theme';

const StatsScreen1 = () => {
  const [slice, setSlice] = useState({
    label: '',
    value: 0,
  });
  const [labelWidth, setLabelWidth] = useState(0);
  const {label, value} = slice;
  const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
  const values = [15, 25, 35, 45, 55];
  const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];

  const [type, setType] = useState('expense');
  const [data, setData] = useState([]);
  const getStats = async () => {
    const statList = await getMonthlyStats(type);
    const newData: any = [];
    statList.forEach((category: any, index: number) => {
      // console.log(category);
      // newData.push({
      //   amount: category.amount,
      //   name: category.expenseCategoryTitle,
      //   color: deepPurple[(index + 1) * 100],
      //   legendFontSize: 15,
      //   legendFontColor: deepPurple[(index + 1) * 100],
      // });
      newData.push({
        amount: category.amount,
        name: category.expenseCategoryTitle,
        color: deepPurple[(index + 1) * 100],
        legendFontSize: 15,
        legendFontColor: deepPurple[(index + 1) * 100],

        key: category.expenseCategoryTitle,
        value: category.amount,
        svg: {fill: colors[index]},
        arc: {
          outerRadius: 110 + '%',
          padAngle: label === category.expenseCategoryTitle ? 0.1 : 0,
        },
        onPress: () =>
          setSlice({
            label: category.expenseCategoryTitle,
            value: category.amount,
          }),
      });
    });
    setData(newData);
    // console.log(newData);
  };
  useEffect(() => {
    getStats();
  }, [type]);

  // const data1 = keys.map((key, index) => {
  //   return {
  //     key,
  //     value: values[index],
  //     svg: {fill: colors[index]},
  //     arc: {
  //       outerRadius: 70 + values[index] + '%',
  //       padAngle: label === key ? 0.1 : 0,
  //     },
  //     onPress: () => setSlice({label: key, value: values[index]}),
  //   };
  // });
  // console.log(data1);
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <PieChart
        style={{height: 300}}
        outerRadius={'80%'}
        innerRadius={'20%'}
        data={data}
      />
      {/* <Text
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          setLabelWidth(width);
        }}
        style={{
          position: 'absolute',
          left: deviceWidth / 2 - labelWidth / 2,
          textAlign: 'center',
        }}>
        {`${label} \n ${value}`}
      </Text> */}
      <View style={styles.typeWrapper}>
        <Pressable
          style={styles.typeBtn}
          onPress={() => {
            setType('expense');
          }}>
          <Text style={styles.typeBtnText}>Expense</Text>
        </Pressable>
        <Pressable
          style={styles.typeBtn}
          onPress={() => {
            setType('income');
          }}>
          <Text style={styles.typeBtnText}>Income</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  typeBtnText: {
    color: colors.white,
  },
  typeBtn: {
    padding: 20,
    backgroundColor: colors.brand.brandMedium,
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
export default StatsScreen1;
