import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_TOAST } from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {
  getTransactionImages,
  removeImages,
  saveTransaction,
  updateTransaction,
} from '../transaction/TransactionController';
import {
  ITransaction,
  ITransactionImage,
  TransactionType,
} from '../transaction/TransactionTypes';
import { dateFormatter } from '../utils/Formatter';
import PaymentsDropdown from '../common/PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import t from '../common/translations/Translation';
import TransactionCategotyList from '../transaction/TransactionCategotyList';
import { ICurrency } from '../database/common/CurrencyController';
import IconMap from '../common/IconMap';
import UploadMenu from './UploadMenu';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { categoryStyles, uploadMenuStyle } from '../styles/commonStyles';

interface IAddEditTransaction {
  navigation: any;
  route?: any;
}

interface IErrorMessages {
  title?: string;
  amount?: string;
  transactionCategoryId?: string;
}

const defaultErrMsg: IErrorMessages = {
  title: '',
  amount: '',
  transactionCategoryId: '',
};

const AddEditTransaction = ({ navigation, route }: IAddEditTransaction) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { colors, formStyles, styles, commonStyles } = GetTheme(categoryStyles);

  const uploadMenuStyles = GetStyle(uploadMenuStyle);

  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  const { transaction }: { transaction: ITransaction } = route.params;

  const transactionType: TransactionType =
    transaction?.transactionType ?? route.params.type;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);
  const [title, setTitle] = useState(() => {
    return transaction?.title ?? '';
  });
  const [amount, setAmount] = useState(() => {
    return transaction?.amount.toString() ?? '';
  });
  const [paymentId, setPaymentId] = useState(() => {
    return transaction?.paymentId ?? 1;
  });
  const [description, setDescription] = useState(() => {
    return transaction?.description ?? '';
  });
  const [transactionCategoryId, setTransactionCategoryId] = useState<
    number | null
  >(() => {
    return transaction?.transactionCategoryId ?? null;
  });
  const [editMode] = useState(() => {
    return transaction ? true : false;
  });
  const [dateAddedTlm, setDateAddedTlm] = useState(() => {
    return transaction?.dateAddedTlm ?? dateFormatter(new Date());
    // return new Date();
  });

  const [pinned, setPinned] = useState(() => {
    return transaction?.pinned ?? 0;
    // return new Date();
  });

  //upload image
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageList, setImageList] = useState<ITransactionImage[]>([]);
  const menuAnimamated = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  const validateInputs = (): boolean => {
    const msg: IErrorMessages = { ...defaultErrMsg };
    let isValid = true;
    if (!title.trim()) {
      msg.title = t('invalidExpenseTitle');
      isValid = false;
    }
    if (!amount.trim()) {
      msg.amount = t('invalidAmount');
      isValid = false;
    }

    if (transactionCategoryId == null) {
      msg.transactionCategoryId = t('invalidtransactionCatgoeryId');
      isValid = false;
    }

    setErrMsg(msg);
    return isValid;
  };

  const clearInputs = () => {
    setTitle('');
    setAmount('');
    setPaymentId(1);
    setDescription('');
    // setTransactionCategoryId(null);
    setDateAddedTlm(dateFormatter(new Date()));
    setImageList([]);
  };

  const saveEditTransactioneHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    const modTransaction: ITransaction = {
      transactionId: transaction?.transactionId ?? undefined,
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      transactionType: transactionType,
      pinned: pinned,
      description,
      transactionCategoryId: Number(transactionCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    let result = null;
    if (editMode) {
      result = await updateTransaction(modTransaction, imageList);
      const titleType =
        transactionType === TransactionType.INCOME
          ? 'incomeUpdated'
          : 'expenseUpdated';
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t(titleType, { name: modTransaction.title }),
            },
          ],
        });
        navigation.goBack();
      }
    } else {
      result = await saveTransaction([modTransaction], imageList);
      const titleType =
        transactionType === TransactionType.INCOME
          ? 'incomeSaved'
          : 'expenseSaved';
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t(titleType, { name: modTransaction.title }),
            },
          ],
        });
        clearInputs();
      }
    }
  };

  // const appTitle = transactionType ===

  const getAppTitle = (): string => {
    if (editMode) {
      return transactionType === TransactionType.INCOME
        ? t('EditIncome')
        : t('EditExpense');
    } else {
      return transactionType === TransactionType.INCOME
        ? t('AddIncome')
        : t('AddExpense');
    }
  };

  //image upload
  const showUploadMenu = async (showUpload: boolean) => {
    Animated.timing(menuAnimamated, {
      useNativeDriver: true,
      toValue: showUpload ? 1 : 0,
      duration: 300,
    }).start();
    setShowImageUpload(showUpload);
  };

  const fetchTransactionImages = async () => {
    if (transaction?.transactionId) {
      const result: ITransactionImage[] = await getTransactionImages(
        transaction.transactionId,
      );
      setImageList(result);
    }
    return [];
  };

  const removeImage = async (imageId?: number) => {
    console.log(imageId);
    if (!imageId) {
      setImageList([]);
      return;
    }
    const result = await removeImages(imageId);
    if (result) {
      setImageList([]);
      dispatch({
        type: SHOW_TOAST,
        payload: [
          {
            title: t('removeImage'),
          },
        ],
      });
    }
  };

  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title, amount]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTransactionImages();
    });
    return unsubscribe;
  }, []);
  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          title={getAppTitle()}
          navigation={navigation}
          homeScreen={false}
          backTo=""
          scrollY={scrollY}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        <View style={[commonStyles.container, styles.expenseWrapper]}>
          <WeeklyView defaultValue={dateAddedTlm} onChange={setDateAddedTlm} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Expense title</Text>
              <TextInput
                placeholderTextColor={colors.textCardGray}
                placeholder="Eg, Spetember salary"
                style={formStyles.input}
                onChangeText={setTitle}
                value={title}
              />
              {errMsg.title !== '' && (
                <Text style={formStyles.inputError}>{errMsg.title}</Text>
              )}
            </View>
          </View>
          <View style={formStyles.inputContainer}>
            <View style={[formStyles.inputWrapper, formStyles.halfWidth]}>
              <Text style={formStyles.inputLabel}>
                {currency.symbol} {t('amount')}
              </Text>
              <TextInput
                placeholderTextColor={colors.textCardGray}
                keyboardType="number-pad"
                numberOfLines={1}
                placeholder="Eg, 20,000"
                style={formStyles.input}
                onChangeText={setAmount}
                value={amount}
              />
              {errMsg.amount !== '' && (
                <Text style={formStyles.inputError}>{errMsg.amount}</Text>
              )}
            </View>
            <View style={formStyles.inputDivider} />
            <PaymentsDropdown
              defaultValue={paymentId}
              onChange={setPaymentId}
            />
          </View>
          <TransactionCategotyList
            navigation={navigation}
            defaultValue={transactionCategoryId}
            onChange={setTransactionCategoryId}
            type={transactionType}
          />
          {errMsg.transactionCategoryId !== '' && (
            <Text style={formStyles.inputError}>
              {errMsg.transactionCategoryId}
            </Text>
          )}
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>{t('note')}</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder={t('description')}
                placeholderTextColor={colors.textCardGray}
                style={formStyles.input}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>
          {imageList.length > 0 && (
            <View style={uploadMenuStyles.imageListWrapper}>
              <View>
                <Text style={formStyles.inputLabel}>{t('uploads')}</Text>
              </View>
              <Pressable
                style={uploadMenuStyles.imageListContainer}
                onPress={() => {
                  navigation.navigate('ImageView', { imageList });
                }}>
                {imageList.map((image: ITransactionImage, index: number) => {
                  return (
                    <View
                      style={uploadMenuStyles.imageListItemWrapper}
                      key={`image-${index}`}>
                      <Image
                        style={uploadMenuStyles.imageListItem}
                        resizeMode="cover"
                        source={{
                          uri: image.base64,
                        }}
                      />
                      <Pressable
                        onPress={() => {
                          removeImage(image.imageId);
                        }}
                        style={uploadMenuStyles.imageListItemRemove}>
                        <IconMap
                          size={32}
                          name={'close'}
                          color={colors.textBrandLightMedium}
                        />
                      </Pressable>
                    </View>
                  );
                })}
              </Pressable>
            </View>
          )}
          <View style={formStyles.actionContainer}>
            <View style={formStyles.actionQuickmenu}>
              <Pressable
                onPress={async () => {
                  showUploadMenu(!showImageUpload);
                }}
                style={[formStyles.actionBtn, formStyles.pinnedActive]}>
                <IconMap
                  name="image"
                  color={colors.textBrandMedium}
                  size={28}
                />
              </Pressable>
              <Pressable
                // activeOpacity={0.8}
                // extraButtonProps={{ rippleColor: 'red' }}
                onPress={() => {
                  const msg = pinned ? t('txUnpinned') : t('txPinned');
                  dispatch({
                    type: SHOW_TOAST,
                    payload: [
                      {
                        title: msg,
                      },
                    ],
                  });
                  setPinned(!pinned);
                }}
                style={[
                  formStyles.actionBtn,
                  pinned ? formStyles.pinnedActive : formStyles.pinnedInactive,
                  {
                    backgroundColor: pinned
                      ? colors.brandMedium
                      : colors.brandLight,
                  },
                ]}>
                <IconMap
                  name="paper-clip"
                  color={pinned ? colors.textLight : colors.textBrandMedium}
                  size={28}
                />
              </Pressable>
            </View>
            <Pressable
              // activeOpacity={0.8}
              // extraButtonProps={{ rippleColor: 'red' }}
              // activeOpacity={0.6}
              style={[
                formStyles.button,
                formStyles.saveButton,
                formStyles.fullWidth,
              ]}
              onPress={() => {
                saveEditTransactioneHandler();
              }}>
              <Text style={formStyles.buttonLabel}>
                {editMode ? t('update') : t('add')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollViewWrapper>
      <Animated.View
        style={[
          uploadMenuStyles.uploadWrapper,
          {
            transform: [
              {
                translateY: menuAnimamated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [193, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <View
          style={[commonStyles.container, uploadMenuStyles.uploadMenuHeader]}>
          <View>
            <Text style={uploadMenuStyles.uploadMenuTitle}>
              {t('uploadImages')}
            </Text>
            <Text style={uploadMenuStyles.uploadMenuSubTitle}>
              {t('uploadImagesNotification')}
            </Text>
          </View>
          <Pressable
            style={uploadMenuStyles.uploadMenuClose}
            onPress={() => {
              showUploadMenu(false);
            }}>
            <IconMap size={34} name="close" color={colors.textBrandMedium} />
          </Pressable>
        </View>
        <UploadMenu
          menuHandler={showUploadMenu}
          imageListCallback={setImageList}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default AddEditTransaction;
