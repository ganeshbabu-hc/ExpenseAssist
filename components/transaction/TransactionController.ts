import {
  ITransaction,
  ITransactionCategory,
  ITransactionImage,
  TransactionType,
} from './TransactionTypes';
import {
  EXPENSE_QUERY_LIMIT,
  TNAME_CURRENCY_TYPES,
  TNAME_TRANSACTIONS,
  TNAME_TRANSACTION_CATEGORIES,
  TNAME_PAYMENT_TYPES,
  TNAME_TRANSACTION_IMAGES,
} from '../utils/Constants';
import { getDBConnection } from '../database/DBController';
import { Asset } from 'react-native-image-picker';

interface IQueryParams {
  [key: string]: string;
}

export const saveTransaction = async (
  transaction: ITransaction[],
  imageList?: ITransactionImage[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_TRANSACTIONS}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, TRANSACTION_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, TRANSACTION_TYPE, PINNED) values` +
    transaction
      .map(
        (i: ITransaction) =>
          `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${
            i.transactionCategoryId
          }, '${i.description}', '${i.dateAddedTlm}', CURRENT_TIMESTAMP,'${
            i.transactionType
          }', '${i.pinned ? 1 : 0}')`,
      )
      .join(',');
  // base64
  const db = await getDBConnection();
  let result = await db.executeSql(insertQuery);
  console.log(result);
  const insertID = result[0].insertId;
  if (result && imageList && imageList.length > 0) {
    console.log('Inserting the images');
    // save images
    // const imageInsertQuery =
    //   `INSERT OR REPLACE INTO ${TNAME_TRANSACTION_IMAGES}(TRANSACTION_ID, IMAGE, DATE_ADDED_TLM, DATE_UPDATED_TLM) values` +
    //   imageList
    //     .map(async (i: Asset) => {
    //       // console.log('--------------\n-------', blob);
    //       const imageBlob = await base64ToBlob(i.uri);
    //       console.log('-----------imageBlob---\n-------', imageBlob);
    //       return `('${insertID}', ${imageBlob}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
    //     })
    //     .join(',');
    //     console.log('imageInsertQuery----', imageInsertQuery);
    const imageBlob = await base64ToBlob(imageList[0].base64);
    const imageInsertQuery = `INSERT OR REPLACE INTO ${TNAME_TRANSACTION_IMAGES}(TRANSACTION_ID, IMAGE, DATE_ADDED_TLM, DATE_UPDATED_TLM) values 
    ('${insertID}', '${imageBlob}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
    // console.log('imageInsertQuery----', imageInsertQuery);
    result = await db.executeSql(imageInsertQuery);

    console.log('Inserting the return', result);
  }
  return result;
};

export const updateTransaction = async (transaction: ITransaction) => {
  const insertQuery = `UPDATE ${TNAME_TRANSACTIONS} 
  SET TITLE='${transaction.title}',
  AMOUNT=${transaction.amount},
  PAYMENT_ID=${transaction.paymentId},
  CURRENCY_ID=${transaction.currencyId},
  TRANSACTION_CATEGORY_ID=${transaction.transactionCategoryId},
  DESCRIPTION='${transaction.description}',
  DATE_ADDED_TLM='${transaction.dateAddedTlm}',
  PINNED='${transaction.pinned ? 1 : 0}',
  DATE_ADDED_TLM='${transaction.dateAddedTlm}',
  DATE_UPDATED_TLM=CURRENT_TIMESTAMP
  WHERE TRANSACTION_ID=${transaction.transactionId}`;
  const db = await getDBConnection();
  return await db.executeSql(insertQuery);
};

export const getTransactionImages = async (
  transactionId: number,
): ITransactionImage[] => {
  const getQuery = `SELECT IMAGE_ID as imageId, IMAGE as base64, TRANSACTION_ID as transactionID FROM  ${TNAME_TRANSACTION_IMAGES} 
  WHERE TRANSACTION_ID=${transactionId}`;
  const db = await getDBConnection();
  const results = await db.executeSql(getQuery);

  console.log(results);

  const images: ITransactionImage[] = [];
  results.forEach((result: any) => {
    for (let index = 0; index < result.rows.length; index++) {
      // console.log('resultsresultsresults', result.rows.item(index));
      const transaction: ITransactionImage = result.rows.item(
        index,
      ) as ITransactionImage;
      images.push(transaction);
    }
  });
  return images;
};

export const getTransactions = async (
  limit?: number,
  type?: TransactionType,
  query?: string,
): Promise<ITransaction[]> => {
  try {
    const expenses: ITransaction[] = [];
    const db = await getDBConnection();
    const dataLimit = limit ?? EXPENSE_QUERY_LIMIT;

    let queryParams: IQueryParams = {};
    if (type === TransactionType.INCOME) {
      queryParams['tx.TRANSACTION_TYPE'] = `= '${TransactionType.INCOME}'`;
    } else if (type === TransactionType.EXPENSE) {
      queryParams['tx.TRANSACTION_TYPE'] = `= '${TransactionType.EXPENSE}'`;
    } else if (type === TransactionType.PINNED) {
      queryParams['tx.PINNED'] = '= 1';
    }

    if (query && query?.trim() !== '') {
      queryParams['tx.TITLE'] = `LIKE '%${query}%'`;
    }

    const params = getQueryByConditions(queryParams);

    const sqlQuery: string = `SELECT 
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
    ${params} 
    ORDER BY tx.DATE_ADDED_TLM DESC 
    LIMIT ${dataLimit}`;

    const results = await db.executeSql(sqlQuery);

    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        const transaction: ITransaction = result.rows.item(
          index,
        ) as ITransaction;
        expenses.push(transaction);
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
    const deleteQuery = `DELETE from ${TNAME_TRANSACTIONS} where TRANSACTION_ID = ${transactionId};
    DELETE from ${TNAME_TRANSACTION_IMAGES} where TRANSACTION_ID = ${transactionId}`;
    const results = await db.executeSql(deleteQuery);
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
    return results;
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove expense !!!');
  }
};

const getQueryByConditions = (queryParams: IQueryParams): string => {
  const columns = Object.keys(queryParams);
  let query = '';
  columns.forEach((column: string, index: number) => {
    if (index === 0) {
      query += 'WHERE';
    } else {
      query += 'AND';
    }
    query += ` ${column} ${queryParams[column]} `;
  });
  return query;
};

const base64ToBlob = async (base64: any) => {
  // let url = `data:image/png;base64,${base64}`;
  // console.log('--------------url------', url);
  // let res = await fetch(url);
  // console.log('--------------res------', res);
  // let blob = await res?.blob();

  // let url = base64;
  // // console.log('--------------url------', url);
  // let res = await fetch(url);
  // console.log('--------------res------', res);
  // let blob = await res?.blob();
  // console.log('--------------res------', blob);
  return base64;
};
