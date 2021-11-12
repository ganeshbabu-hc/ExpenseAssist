import React from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {UPDATE_SCROLLX} from '../../redux/constants/StoreConstants';
import {commonStyles} from '../styles/theme';
import AppHeader from './AppHeader';
const ScrollViewWrapper = (props: any) => {
  const dispatch = useDispatch();

  // const scrollY = new Animated.Value(0);

  return (
    <ScrollView
      // onScroll={Animated.event(
      //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
      //   {useNativeDriver: false},
      // )}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always"
      {...props}>
      {props.children}
    </ScrollView>
  );
};

export default ScrollViewWrapper;
