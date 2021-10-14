import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Wave from '../../home/Wave';
import {commonStyles} from '../../styles/common';
import AppHeader from '../AppHeader';
import TypeList from './TypeList';

const AddType = ({navigation}) => {
  return (
    <React.Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={commonStyles.container}>
          <AppHeader
            homeScreen={false}
            navigation={navigation}
            title="Add"
            backTo="Home"
          />
          <TypeList navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
      {/* <Add /> */}
      {/* <Wave /> */}
    </React.Fragment>
  );
};

export default AddType;
