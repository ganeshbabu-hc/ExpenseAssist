import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import RecentExpenses from '../../expense/RecentExpenses';
import Wave from '../Wave';
import {colors, commonStyles} from '../../styles/theme';
import AppHeader from '../AppHeader';
import TypeList from './TypeList';
import RecentList from '../RecentList';
import ScrollViewWrapper from '../ScrollViewWrapper';

const AddType = ({navigation}) => {
  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          homeScreen={false}
          navigation={navigation}
          title="Add"
          backTo="Home"
        />
      </View>
      <ScrollViewWrapper>
        <TypeList navigation={navigation} />
        <RecentList navigation={navigation} />
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // typeWrapper: {
  //   backgroundColor: colors.theme[THEME].textLight,
  // },
});

export default AddType;
