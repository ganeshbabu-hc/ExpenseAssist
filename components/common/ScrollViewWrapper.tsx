import React from 'react';
import { Animated, ScrollView, ScrollViewProps } from 'react-native';
interface IScrollViewWrapper extends ScrollViewProps {
  scrollY: Animated.Value;
}

const ScrollViewWrapper = (props: IScrollViewWrapper) => {
  return (
    <Animated.ScrollView
      bounces={false}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: props.scrollY } } }],
        { useNativeDriver: false },
      )}
      {...props}>
      {props.children}
    </Animated.ScrollView>
  );
};

export default ScrollViewWrapper;
