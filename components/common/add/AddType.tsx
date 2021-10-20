import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import RecentExpenses from '../../expense/RecentExpenses';
import Wave from '../Wave';
import {commonStyles} from '../../styles/common';
import AppHeader from '../AppHeader';
import TypeList from './TypeList';

const AddType = ({navigation}) => {
  return (
    <React.Fragment>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={commonStyles.container}>
            <AppHeader
              homeScreen={false}
              navigation={navigation}
              title="Add"
              backTo="Home"
            />
            <TypeList navigation={navigation} />
          </View>
          <Wave />
          <RecentExpenses />
        </ScrollView>
      </SafeAreaView>
      {/* <Add /> */}
      {/* <Wave /> */}
    </React.Fragment>
  );
};

export default AddType;
