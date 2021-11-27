import * as React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import t from '../common/translations/Translation';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { transactionViewStyle } from '../styles/commonStyles';
import { ITransaction } from './TransactionTypes';

interface ITransactionView {
  navigation: any;
}

const TransactionView = ({ navigation, route }: ITransactionView) => {
  const { commonStyles, formStyles } = GetTheme();
  const styles = GetStyle(transactionViewStyle);
  const transaction: ITransaction = route?.params.transaction;
  console.log(transaction);

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
        <Text style={styles.typeLabel}>{transaction.transactionType}</Text>
        <Text style={formStyles.inputLabel}>{transaction.title}</Text>
        <Text style={formStyles.inputLabel}>{transaction.currencySumbol}</Text>
        <Text style={formStyles.inputLabel}>{transaction.amount}</Text>
        <Text style={formStyles.inputLabel}>{transaction.description}</Text>
        <Text style={formStyles.inputLabel}>{transaction.dateAddedTlm}</Text>
        <Text style={formStyles.inputLabel}>{transaction.paymentTitle}</Text>
        <Text style={formStyles.inputLabel}>
          {transaction.transactionCategoryTitle}
        </Text>
        <Text style={formStyles.inputLabel}>
          {transaction.transactionCategoryIcon}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TransactionView;
