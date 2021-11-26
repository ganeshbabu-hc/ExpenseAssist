import React, { useEffect, useRef, useState } from 'react';

import { Animated, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IconMap from './IconMap';
import { SHOW_TOAST } from '../../redux/constants/StoreConstants';
import { GetTheme } from '../styles/GetThemeHook';
import { toastStyles } from '../styles/commonStyles';

export enum ToastPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum ToastType {
  DANGER = 'exclamation-octo',
  INFO = 'exclamation-circle',
  WARNING = 'exclamation-triangle',
}

export interface IToast {
  title: string;
  toastType?: ToastType;
  position?: ToastPosition;
  id?: string | number;
}

interface IMessage {
  message: IToast;
  onHide: Function;
}

const Message = ({ message, onHide }: IMessage) => {
  const { colors, commonStyles, styles } = GetTheme(toastStyles);

  const opacity = useRef(new Animated.Value(0)).current;
  const getIcon = () => {
    const toastType = message.toastType ?? ToastType.INFO;
    return (
      <IconMap
        name={toastType}
        size={commonStyles.icon.width}
        color={colors.textLight}
      />
    );
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1300),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
        styles.message,
      ]}>
      <View style={styles.messageWrapper}>
        {getIcon()}
        <Text style={styles.messageText}>{message.title}</Text>
      </View>
    </Animated.View>
  );
};

export default () => {
  const { styles } = GetTheme(toastStyles);
  const toastMessages: IToast[] = useSelector(
    (state: any) => state.common.toast,
  );
  const [messages, setMessages] = useState<IToast[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastMessages.length > 0) {
      setMessages([...messages, ...toastMessages]);
    }
  }, [toastMessages]);

  useEffect(() => {
    return () => {
      dispatch({
        type: SHOW_TOAST,
        payload: [],
      });
    };
  }, []);

  return (
    <View style={styles.message1Wrapper}>
      {messages.length > 0 &&
        messages.map((message: IToast, index: number) => (
          <Message
            key={`message-id-${index}`}
            message={message}
            onHide={() => {
              setMessages((messagesList: IToast[]) =>
                messagesList.filter(
                  currentMessage => currentMessage !== message,
                ),
              );
            }}
          />
        ))}
    </View>
  );
};
