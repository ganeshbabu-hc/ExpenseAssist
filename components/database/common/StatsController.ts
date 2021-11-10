import {
  TNAME_CURRENCY_TYPES,
  TNAME_EXPENSE,
  TNAME_EXPENSE_CATEGORIES,
  TNAME_INCOME,
  TNAME_INCOME_CATEGORIES,
  TNAME_PAYMENT_TYPES,
} from '../../utils/Constants';
import {getDBConnection} from '../DBController';
export interface ISummary {
  totalExpense?: number;
  totalIncome?: number;
  monthlyExpense?: number;
  monthlyIncome?: number;
}

export const getMonthlyStats = async (type: string): Promise<any> => {
  try {
    let meta: any = [];
    try {
      if (type === 'expense') {
        const query = `SELECT 
        ex.EXPENSE_CATEGORY_ID as expenseCategoryId,
        SUM(ex.AMOUNT) as amount,
        ex.CURRENCY_ID as currencyId,
        ex.DATE_ADDED_TLM as dateAddedTlm,
        ex.DATE_UPDATED_TLM as dateUpdatedTlm,
        ec.TITLE as expenseCategoryTitle,
        ec.CATEGORY_ICON as expenseCategoryIcon,
        pt.TITLE as paymentTitle,
        ct.SYMBOL as currencySumbol
        FROM ${TNAME_EXPENSE} ex 
        LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID 
        LEFT JOIN ${TNAME_EXPENSE_CATEGORIES} ec ON ex.EXPENSE_CATEGORY_ID = ec.EXPENSE_CATEGORY_ID 
        LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID 
        GROUP BY ex.EXPENSE_CATEGORY_ID
        ORDER BY ex.AMOUNT ASC`;

        // const query = `SELECT 
        // ex.EXPENSE_ID as expenseId,
        // ex.PAYMENT_ID as paymentId,
        // ex.TITLE as title,
        // ex.DESCRIPTION as description,
        // ex.EXPENSE_CATEGORY_ID as expenseCategoryId,
        // SUM(ex.AMOUNT) as amount,
        // ex.CURRENCY_ID as currencyId,
        // ex.DATE_ADDED_TLM as dateAddedTlm,
        // ex.DATE_UPDATED_TLM as dateUpdatedTlm,
        // ec.TITLE as expenseCategoryTitle,
        // ec.CATEGORY_ICON as expenseCategoryIcon,
        // pt.TITLE as paymentTitle,
        // ct.SYMBOL as currencySumbol
        // FROM ${TNAME_EXPENSE} ex 
        // LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID 
        // LEFT JOIN ${TNAME_EXPENSE_CATEGORIES} ec ON ex.EXPENSE_CATEGORY_ID = ec.EXPENSE_CATEGORY_ID 
        // LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID 
        // GROUP BY ex.EXPENSE_CATEGORY_ID
        // ORDER BY ex.AMOUNT ASC`;

        const db = await getDBConnection();
        const results = await db.executeSql(query);
        results.forEach((result: any) => {
          for (let index = 0; index < result.rows.length; index++) {
            meta.push(result.rows.item(index));
          }
        });
        // console.log(meta);
        return meta;
      } else {
        const query = `SELECT 
          ex.INCOME_ID as incomeId,
          ex.PAYMENT_ID as paymentId,
          ex.TITLE as title,
          ex.DESCRIPTION as description,
          ex.INCOME_CATEGORY_ID as incomeCategoryId,
          SUM(ex.AMOUNT) as amount,
          ex.CURRENCY_ID as currencyId,
          ex.DATE_ADDED_TLM as dateAddedTlm,
          ex.DATE_UPDATED_TLM as dateUpdatedTlm,
          ec.TITLE as incomeCategoryTitle,
          ec.CATEGORY_ICON as incomeCategoryIcon,
          pt.TITLE as paymentTitle,
          ct.SYMBOL as currencySumbol
          FROM ${TNAME_INCOME} ex 
          LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID 
          LEFT JOIN ${TNAME_INCOME_CATEGORIES} ec ON ex.INCOME_CATEGORY_ID = ec.INCOME_CATEGORY_ID 
          LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID 
          GROUP BY ex.INCOME_CATEGORY_ID
          ORDER BY ex.AMOUNT ASC`;

        const db = await getDBConnection();
        const results = await db.executeSql(query);
        results.forEach((result: any) => {
          for (let index = 0; index < result.rows.length; index++) {
            meta.push(result.rows.item(index));
          }
        });
        // console.log(meta);
        return meta;
      }

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
