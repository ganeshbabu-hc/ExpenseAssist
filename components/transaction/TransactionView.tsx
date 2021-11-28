import * as React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import t from '../common/translations/Translation';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { transactionViewStyle, uploadMenuStyle } from '../styles/commonStyles';
import { ITransaction, ITransactionImage } from './TransactionTypes';
import { useSelector } from 'react-redux';
import { ICurrency } from '../database/common/CurrencyController';
import IconMap from '../common/IconMap';
import { useEffect, useState } from 'react';
import { getTransactionImages } from './TransactionController';

interface ITransactionView {
  navigation: any;
}

const TransactionView = ({ navigation, route }: ITransactionView) => {
  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });
  const { commonStyles, colors } = GetTheme();
  const styles = GetStyle(transactionViewStyle);
  const uploadMenuStyles = GetStyle(uploadMenuStyle);
  const transaction: ITransaction = route?.params.transaction;
  const [imageList, setImageList] = useState<ITransactionImage[]>([]);

  const fetchTransactionImages = async () => {
    if (transaction?.transactionId) {
      const result: ITransactionImage[] = await getTransactionImages(
        transaction.transactionId,
      );
      setImageList(result);
    }
    return [];
  };

  useEffect(() => {
    fetchTransactionImages();
  }, []);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('transaction')}
        />
        <View />
      </View>
      <View style={commonStyles.container}>
        <Text style={styles.typeLabel}>
          {t(transaction.transactionType.toUpperCase())}
        </Text>
        <View style={styles.labelWrapper}>
          <Text style={[styles.txnSymbol]}>{currency.symbol}</Text>
          <Text style={[styles.txnAmount, styles.labelRight]}>
            {transaction.amount}
          </Text>
        </View>
        <Text style={styles.txnTitle}>{transaction.title}</Text>
        {transaction?.description?.length > 0 && (
          <Text style={styles.txnDesc}>{transaction.description}</Text>
        )}
        <View style={styles.labelWrapper}>
          <IconMap name="calendar" color={colors.textCardGray} />
          <Text style={[styles.txnTitle, styles.labelRight]}>
            {transaction.dateAddedTlm}
          </Text>
        </View>
        <Text style={styles.txnDesc}>{t('paidBy')}</Text>
        <Text style={styles.txnTitle}>{transaction.paymentTitle}</Text>
        <Text style={styles.txnDesc}>{t('category')}</Text>
        <View style={styles.labelWrapper}>
          <IconMap
            name={transaction.transactionCategoryIcon ?? 'payment'}
            color={colors.textCardGray}
          />
          <Text style={[styles.txnTitle, styles.labelRight]}>
            {transaction.transactionCategoryTitle}
          </Text>
        </View>
        {imageList.length > 0 && (
          <View style={uploadMenuStyles.imageListWrapper}>
            <View>
              <Text style={styles.txnDesc}>{t('uploads')}</Text>
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
                        // removeImage(image.imageId);
                      }}
                      style={uploadMenuStyles.imageListItemRemove}>
                      <IconMap
                        size={32}
                        name={'close'}
                        color={colors.textLight}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TransactionView;
