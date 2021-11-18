import {
  INCOME_QUERY_LIMIT,
  TNAME_CURRENCY_TYPES,
  TNAME_TRANSACTIONS,
  TNAME_PAYMENT_TYPES,
  TNAME_TRANSACTION_CATEGORIES,
} from '../../utils/Constants';
import {getDBConnection} from '../DBController';
import {ITransaction} from '../transaction/TransactionTypes';

export const saveIncome = async (income: ITransaction[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_TRANSACTIONS}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, TRANSACTION_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, TRANSACTION_TYPE) values` +
    income
      .map(
        i =>
          `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${i.transactionCategoryId}, '${i.description}', '${i.dateAddedTlm}', CURRENT_TIMESTAMP, '${i.transactionType}')`,
      )
      .join(',');
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const updateIncome = async (income: ITransaction) => {
  const insertQuery = `UPDATE ${TNAME_TRANSACTIONS} 
  SET TITLE='${income.title}',
  AMOUNT=${income.amount},
  PAYMENT_ID=${income.paymentId},
  CURRENCY_ID=${income.currencyId},
  TRANSACTION_CATEGORY_ID=${income.transactionCategoryId},
  DESCRIPTION='${income.description}',
  DATE_ADDED_TLM='${income.dateAddedTlm}',
  DATE_UPDATED_TLM=CURRENT_TIMESTAMP
  WHERE TRANSACTION_ID=${income.transactionId}`;
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const getIncomes = async (limit?: number): Promise<ITransaction[]> => {
  try {
    const incomes: ITransaction[] = [];
    const db = await getDBConnection();
    const dataLimit = limit ?? INCOME_QUERY_LIMIT;
    const results = await db.executeSql(
      `SELECT 
      ex.TRANSACTION_ID as transactionId,
      ex.PAYMENT_ID as paymentId,
      ex.TITLE as title,
      ex.DESCRIPTION as description,
      ex.TRANSACTION_CATEGORY_ID as transactionCategoryId,
      ex.AMOUNT as amount,
      ex.CURRENCY_ID as currencyId,
      ex.DATE_ADDED_TLM as dateAddedTlm,
      ex.DATE_UPDATED_TLM as dateUpdatedTlm,
      ec.TITLE as transactionCategoryTitle,
      ec.CATEGORY_ICON as transactionCategoryIcon,
      pt.TITLE as paymentTitle,
      ct.SYMBOL as currencySumbol
      FROM ${TNAME_TRANSACTIONS} ex 
      LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID 
      LEFT JOIN ${TNAME_TRANSACTION_CATEGORIES} ec ON ex.TRANSACTION_CATEGORY_ID = ex.TRANSACTION_CATEGORY_ID 
      LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID 
      ORDER BY ex.DATE_ADDED_TLM DESC 
      LIMIT ${dataLimit}`,
    );
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        const income: ITransaction = result.rows.item(index) as ITransaction;
        incomes.push(income);
      }
    });
    return incomes;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get incomes !!!');
  }
};

export const removeIncomes = async (incomeIds?: number): Promise<any> => {
  try {
    const db = await getDBConnection();
    const deleteQuery = `DELETE from ${TNAME_TRANSACTIONS} where TRANSACTION_ID = ${incomeIds}`;
    const results = await db.executeSql(deleteQuery);
    return results;
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove income !!!');
  }
};
