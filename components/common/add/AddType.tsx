import React from 'react';
import { Animated, SafeAreaView, View } from 'react-native';
import AppHeader from '../AppHeader';
import TypeList from './TypeList';
import TransactionList from '../../transaction/TransactionList';
import { useRef } from 'react';
import { GetTheme } from '../../styles/GetThemeHook';

const AddType = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { commonStyles } = GetTheme();
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


export default AddType;
