import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { useDispatch } from 'react-redux';
import { SHOW_TOAST, SHOW_MODAL } from '../../redux/constants/StoreConstants';
import IconMap from '../common/IconMap';
import ModalContent from '../common/modal/ModalContent';
import { ToastType } from '../common/ToastNotification';
import t from '../common/translations/Translation';
import { removeTransactionCategory } from '../transaction/TransactionController';
import {
  TransactionType,
  ITransactionCategory,
} from '../transaction/TransactionTypes';
import { recentListStyles } from '../styles/recentList';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';

interface ITransactionCategoryItem {
  index: number;
  category: ITransactionCategory;
  navigation?: any;
  onUpdate: Function;
}

const TransactionCategoryItem = ({
  category,
  navigation,
  index,
  onUpdate,
}: ITransactionCategoryItem) => {
  const dispatch = useDispatch();
  const { commonStyles, colors } = GetTheme();
  const recentList = GetStyle(recentListStyles);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const removeAnimation = useRef(new Animated.Value(0)).current;

  const removeTranslate = removeAnimation?.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const removeTransactionCategories = async (
    txnCategory: ITransactionCategory,
  ) => {
    const result = await removeTransactionCategory(
      txnCategory.transactionCategoryId,
    );
    if (result) {
      dispatch({
        type: SHOW_TOAST,
        payload: [
          {
            title: t('categoryRemoved', { name: txnCategory.title }),
            toastType: ToastType.WARNING,
          },
        ],
      });
      onUpdate();
    }
  };

  const editTransactionCategory = (txCategory: ITransactionCategory) => {
    navigation.navigate('AddEditCategory', { transactionCategory: txCategory });
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 350,
      delay: index * 50,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim, index]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
          {
            scaleY: removeTranslate,
          },
        ],
      }}>
      <Swipeout
        autoClose={true}
        style={recentList.swiper}
        right={[
          {
            onPress: () => {
              removeTransactionCategories(category);
            },
            component: (
              <View
                style={[
                  recentList.swipeIcon,
                  index !== 0 ? recentList.dividerMargin : {},
                ]}>
                <IconMap color={colors.textBrandMedium} name="trash" />
              </View>
            ),
          },
        ]}>
        <View>
          {index !== 0 && (
            <View style={recentList.dividerWrapper}>
              <Text style={recentList.divider} />
            </View>
          )}
          <Pressable
            onLongPress={() => {
              dispatch({
                type: SHOW_MODAL,
                payload: {
                  modalContent: () => (
                    <ModalContent header={'Expense : ' + category.title}>
                      <Text>Hai</Text>
                    </ModalContent>
                  ),
                },
              });
            }}
            style={recentList.listItem}>
            <View style={recentList.listItemInfo}>
              <View
                style={[
                  recentList.listItemIconWrapper,
                  commonStyles.mt0,
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.brandMedium : colors.brandMedium,
                  },
                ]}>
                <IconMap
                  name={
                    category.transactionType === TransactionType.INCOME
                      ? category.categoryIcon ?? 'cash-plus'
                      : category.categoryIcon ?? 'cash-minus'
                  }
                  color={colors.textLight}
                />
              </View>
              <View style={recentList.listItemInfoWrapper}>
                <View>
                  <Text style={recentList.listItemTitle}>{category.title}</Text>
                  {category.description !== null && (
                    <Text style={recentList.listItemDate}>
                      {category.description}
                    </Text>
                  )}
                </View>
                <View style={recentList.listItemInfoIcon}>
                  {category.editable === 1 && (
                    <Pressable
                      onPress={() => {
                        editTransactionCategory(category);
                      }}>
                      <IconMap name={'edit'} color={colors.textBrandMedium} />
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </Swipeout>
    </Animated.View>
  );
};

export default TransactionCategoryItem;
