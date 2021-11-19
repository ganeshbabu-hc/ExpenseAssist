import {
  ITransaction,
  ITransactionCategory,
  TransactionType,
} from './TransactionTypes';
import {
  EXPENSE_QUERY_LIMIT,
  TNAME_CURRENCY_TYPES,
  TNAME_TRANSACTIONS,
  TNAME_TRANSACTION_CATEGORIES,
  TNAME_PAYMENT_TYPES,
} from '../utils/Constants';
import {getDBConnection} from '../database/DBController';

export const saveTransaction = async (expense: ITransaction[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_TRANSACTIONS}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, TRANSACTION_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, TRANSACTION_TYPE) values` +
    expense
      .map(
        i =>
          `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${i.transactionCategoryId}, '${i.description}', '${i.dateAddedTlm}', CURRENT_TIMESTAMP,'${i.transactionType}')`,
      )
      .join(',');
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const updateTransaction = async (expense: ITransaction) => {
  const insertQuery = `UPDATE ${TNAME_TRANSACTIONS} 
  SET TITLE='${expense.title}',
  AMOUNT=${expense.amount},
  PAYMENT_ID=${expense.paymentId},
  CURRENCY_ID=${expense.currencyId},
  TRANSACTION_CATEGORY_ID=${expense.transactionCategoryId},
  DESCRIPTION='${expense.description}',
  DATE_ADDED_TLM='${expense.dateAddedTlm}',
  DATE_UPDATED_TLM=CURRENT_TIMESTAMP
  WHERE TRANSACTION_ID=${expense.transactionId}`;
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const getTransactions = async (
  limit?: number,
  type?: TransactionType,
): Promise<ITransaction[]> => {
  try {
    const expenses: ITransaction[] = [];
    const db = await getDBConnection();
    const dataLimit = limit ?? EXPENSE_QUERY_LIMIT;
    let typeCond = '';
    if (type === TransactionType.INCOME) {
      typeCond = ` WHERE tx.TRANSACTION_TYPE = '${TransactionType.INCOME}' `;
    } else if (type === TransactionType.EXPENSE) {
      typeCond = ` WHERE tx.TRANSACTION_TYPE = '${TransactionType.EXPENSE}' `;
    } else if (type === TransactionType.PINNED) {
      typeCond = ' WHERE PINNED = 1 ';
    }

    const results = await db.executeSql(
      `SELECT 
      tx.TRANSACTION_ID as transactionId,
      tx.PAYMENT_ID as paymentId,
      tx.TITLE as title,
      tx.DESCRIPTION as description,
      tx.TRANSACTION_CATEGORY_ID as transactionCategoryId,
      tx.AMOUNT as amount,
      tx.TRANSACTION_TYPE as transactionType,
      tx.CURRENCY_ID as currencyId,
      tx.DATE_ADDED_TLM as dateAddedTlm,
      tx.DATE_UPDATED_TLM as dateUpdatedTlm,
      CASE tx.PINNED WHEN 1 THEN true ELSE false END pinned,
      ec.TITLE as transactionCategoryTitle,
      ec.CATEGORY_ICON as transactionCategoryIcon,
      pt.TITLE as paymentTitle,
      ct.SYMBOL as currencySumbol
      FROM ${TNAME_TRANSACTIONS} tx 
      LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON tx.PAYMENT_ID = pt.PAYMENT_ID 
      LEFT JOIN ${TNAME_TRANSACTION_CATEGORIES} ec ON tx.TRANSACTION_CATEGORY_ID = ec.TRANSACTION_CATEGORY_ID 
      LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = tx.CURRENCY_ID 
      ${typeCond} 
      ORDER BY tx.DATE_ADDED_TLM DESC 
      LIMIT ${dataLimit}`,
    );

    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        const expense: ITransaction = result.rows.item(index) as ITransaction;
        expenses.push(expense);
      }
    });
    return expenses;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get expenses !!!');
  }
};

export const getTransactionCategories = async (
  type: TransactionType,
): Promise<ITransactionCategory[]> => {
  try {
    const categories: ITransactionCategory[] = [];
    const db = await getDBConnection();
    const results = await db.executeSql(
      `SELECT TITLE as title, DESCRIPTION as decsription, TRANSACTION_CATEGORY_ID as transactionCategoryId, DATE_ADDED_TLM as dateAddedTlm, DATE_UPDATED_TLM as dateUpdatedTlm, CATEGORY_ICON as categoryIcon FROM ${TNAME_TRANSACTION_CATEGORIES} WHERE CATEGORY_TYPE='${type}' `,
    );
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        categories.push(result.rows.item(index));
      }
    });
    return categories;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get categories !!!');
  }
};

export const removeTransaction = async (
  transactionId?: number,
): Promise<any> => {
  try {
    const db = await getDBConnection();
    const deleteQuery = `DELETE from ${TNAME_TRANSACTIONS} where TRANSACTION_ID = ${transactionId}`;
    const results = await db.executeSql(deleteQuery);
    // console.log('results', results, transactionId);
    return results;
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove expense !!!');
  }
};

export const togglePinTransaction = async (
  transaction?: ITransaction,
): Promise<any> => {
  try {
    const db = await getDBConnection();
    const deleteQuery = `UPDATE ${TNAME_TRANSACTIONS} SET pinned=${
      transaction?.pinned ? 0 : 1
    } where TRANSACTION_ID = ${transaction?.transactionId}`;
    const results = await db.executeSql(deleteQuery);
    // console.log('results', results);
    return results;
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove expense !!!');
  }
};
