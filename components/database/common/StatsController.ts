import {
  TNAME_CURRENCY_TYPES,
  TNAME_EXPENSE,
  TNAME_TRANSACTION_CATEGORIES,
  TNAME_INCOME,
  TNAME_INCOME_CATEGORIES,
  TNAME_PAYMENT_TYPES,
  TNAME_TRANSACTIONS,
} from '../../utils/Constants';
import {getDBConnection} from '../DBController';
import {TransactionType} from '../../transaction/TransactionTypes';
export interface ISummary {
  totalExpense?: number;
  totalIncome?: number;
  monthlyExpense?: number;
  monthlyIncome?: number;
}

export interface IStat {
  transactionCategoryId: number;
  amount: number;
  currencyId: string;
  dateAddedTlm: string;
  dateUpdatedTlm: string;
  transactionCategoryTitle: string;
  transactionCategoryIcon: string;
  paymentTitle: string;
  currencySumbol: string;
}

export const getMonthlyStats = async (type: TransactionType): Promise<any> => {
  try {
    let meta: any = [];
    try {
      let typeCond = '';
      if (type === TransactionType.INCOME) {
        typeCond = ` WHERE tx.TRANSACTION_TYPE = '${TransactionType.INCOME}' `;
      } else if (type === TransactionType.EXPENSE) {
        typeCond = ` WHERE tx.TRANSACTION_TYPE = '${TransactionType.EXPENSE}' `;
      }
      // if (type === TransactionType.EXPENSE) {
      const query = `SELECT 
        tx.TRANSACTION_CATEGORY_ID as transactionCategoryId,
        SUM(tx.AMOUNT) as amount,
        tx.CURRENCY_ID as currencyId,
        tx.DATE_ADDED_TLM as dateAddedTlm,
        tx.DATE_UPDATED_TLM as dateUpdatedTlm,
        ec.TITLE as transactionCategoryTitle,
        ec.CATEGORY_ICON as transactionCategoryIcon,
        pt.TITLE as paymentTitle,
        ct.SYMBOL as currencySumbol
        FROM ${TNAME_TRANSACTIONS} tx 
        LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON tx.PAYMENT_ID = pt.PAYMENT_ID 
        LEFT JOIN ${TNAME_TRANSACTION_CATEGORIES} ec ON tx.TRANSACTION_CATEGORY_ID = ec.TRANSACTION_CATEGORY_ID 
        LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = tx.CURRENCY_ID 
        ${typeCond} 
        GROUP BY tx.TRANSACTION_CATEGORY_ID
        ORDER BY tx.AMOUNT ASC`;

      // const query = `SELECT
      // tx.EXPENSE_ID as expenseId,
      // tx.PAYMENT_ID as paymentId,
      // tx.TITLE as title,
      // tx.DESCRIPTION as description,
      // tx.TRANSACTION_CATEGORY_ID as transactionCategoryId,
      // SUM(tx.AMOUNT) as amount,
      // tx.CURRENCY_ID as currencyId,
      // tx.DATE_ADDED_TLM as dateAddedTlm,
      // tx.DATE_UPDATED_TLM as dateUpdatedTlm,
      // ec.TITLE as transactionCategoryTitle,
      // ec.CATEGORY_ICON as transactionCategoryIcon,
      // pt.TITLE as paymentTitle,
      // ct.SYMBOL as currencySumbol
      // FROM ${TNAME_EXPENSE} ex
      // LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON tx.PAYMENT_ID = pt.PAYMENT_ID
      // LEFT JOIN ${TNAME_TRANSACTION_CATEGORIES} ec ON tx.TRANSACTION_CATEGORY_ID = ec.TRANSACTION_CATEGORY_ID
      // LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = tx.CURRENCY_ID
      // GROUP BY tx.TRANSACTION_CATEGORY_ID
      // ORDER BY tx.AMOUNT ASC`;

      const db = await getDBConnection();
      const results = await db.executeSql(query);
      results.forEach((result: any) => {
        for (let index = 0; index < result.rows.length; index++) {
          const stat: IStat = result.rows.item(index) as IStat;
          meta.push(stat);
        }
      });
      // console.log(meta);
      return meta;
      // } else {
      //   const query = `SELECT
      //     tx.INCOME_ID as incomeId,
      //     tx.PAYMENT_ID as paymentId,
      //     tx.TITLE as title,
      //     tx.DESCRIPTION as description,
      //     tx.TRANSACTION_CATEGORY_ID as transactionCategoryId,
      //     SUM(tx.AMOUNT) as amount,
      //     tx.CURRENCY_ID as currencyId,
      //     tx.DATE_ADDED_TLM as dateAddedTlm,
      //     tx.DATE_UPDATED_TLM as dateUpdatedTlm,
      //     ec.TITLE as transactionCategoryTitle,
      //     ec.CATEGORY_ICON as transactionCategoryIcon,
      //     pt.TITLE as paymentTitle,
      //     ct.SYMBOL as currencySumbol
      //     FROM ${TNAME_INCOME} ex
      //     LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON tx.PAYMENT_ID = pt.PAYMENT_ID
      //     LEFT JOIN ${TNAME_INCOME_CATEGORIES} ec ON tx.TRANSACTION_CATEGORY_ID = tx.TRANSACTION_CATEGORY_ID
      //     LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = tx.CURRENCY_ID
      //     GROUP BY tx.TRANSACTION_CATEGORY_ID
      //     ORDER BY tx.AMOUNT ASC`;

      //   const db = await getDBConnection();
      //   const results = await db.executeSql(query);
      //   results.forEach((result: any) => {
      //     for (let index = 0; index < result.rows.length; index++) {
      //       meta.push(result.rows.item(index));
      //     }
      //   });
      //   return meta;
      // }

      //   const db = await getDBConnection();
      //   const query = `SELECT * from
      //   (SELECT IFNULL(SUM(AMOUNT), 0) as totalExpense from ${TNAME_EXPENSE}) e
      //   LEFT JOIN (SELECT IFNULL(SUM(AMOUNT), 0) as totalIncome from ${TNAME_INCOME}) i
      //   LEFT JOIN (SELECT IFNULL(SUM(AMOUNT), 0) as monthlyExpense from ${TNAME_EXPENSE} where strftime('%Y-%m', DATE_ADDED_TLM)=strftime('%Y-%m','now')) em
      //   LEFT JOIN (SELECT IFNULL(SUM(AMOUNT), 0) as monthlyIncome from ${TNAME_INCOME} where strftime('%Y-%m', DATE_ADDED_TLM)=strftime('%Y-%m','now')) im `;
      //   const results = await db.executeSql(query);
      //   results.forEach((result: any) => {
      //     for (let index = 0; index < result.rows.length; index++) {
      //       meta = result.rows.item(index) as ISummary;
      //     }
      //   });
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
    throw Error('Failed to get getSummary !!!');
  }
};
