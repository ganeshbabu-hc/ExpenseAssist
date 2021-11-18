import React, {useEffect, useRef, useState} from 'react';

import {Animated, StyleSheet, Text, View} from 'react-native';
import {colors, commonStyles, utils} from '../styles/theme';
import {THEME} from '../utils/Constants';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useSelector} from 'react-redux';
import IconMap from './IconMap';

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
  const opacity = useRef(new Animated.Value(0)).current;
  console.log(message);
  const getIcon = () => {
    const toastType = message.toastType ?? ToastType.INFO;
    return (
      <IconMap
        name={toastType}
        size={commonStyles.icon.width}
        color={colors.theme[THEME].textLight}
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
  const toastMessages: IToast[] = useSelector((state: any) => state.common.toast);
  const [messages, setMessages] = useState<IToast[]>([]);

  useEffect(() => {
    // console.log(toastMessages, messages);
    // toastMessages[0].id = new Date().getTime();
    if (toastMessages.length > 0) {
      setMessages([...messages, ...toastMessages]);
    }
  }, [toastMessages]);

  return (
    <>
      <View style={styles.message1Wrapper}>
        {messages.map((message: IToast) => (
          <Message
            key={message.title}
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
    </>
  );
};

const styles = StyleSheet.create({
  message1Wrapper: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  message: {
    margin: 10,
    marginBottom: 5,
    color: colors.theme[THEME].textDark,
    backgroundColor: colors.theme[THEME].brandDark,
    padding: 20,
    borderRadius: utils.inputRadius,
    shadowcolor: colors.theme[THEME].textBrandMedium,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  messageText: {
    color: colors.theme[THEME].textLight,
    marginLeft: 10,
  },
  messageIconWrapper: {},
  messageIcon: {},
});
