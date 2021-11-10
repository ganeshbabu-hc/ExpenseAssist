import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import RecentExpenses from '../../expense/RecentExpenses';
import Wave from '../Wave';
import {colors, commonStyles} from '../../styles/theme';
import AppHeader from '../AppHeader';
import TypeList from './TypeList';
import RecentList from '../RecentList';

const AddType = ({navigation}) => {
  return (
    <SafeAreaView style={styles.typeWrapper}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always">
        <View style={commonStyles.container}>
          <AppHeader
            homeScreen={false}
            navigation={navigation}
            title="Add"
            backTo="Home"
          />
        </View>
        <TypeList navigation={navigation} />
        <RecentList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  typeWrapper: {
    backgroundColor: colors.white,
  },
});

export default AddType;
