import React from 'react';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import {commonStyles} from '../../styles/theme';
import AppHeader from '../AppHeader';
import TypeList from './TypeList';
import TransactionList from '../../database/transaction/TransactionList';
import {useRef} from 'react';

const AddType = ({navigation}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          homeScreen={false}
          navigation={navigation}
          title="Add"
          backTo="Home"
          scrollY={scrollY}
        />
      </View>
      <TypeList navigation={navigation} />
      <TransactionList scrollY={scrollY} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // typeWrapper: {
  //   backgroundColor: colors.theme[THEME].textLight,
  // },
});

export default AddType;
