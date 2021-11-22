import {TNAME_TRANSACTIONS} from '../../utils/Constants';
import {getDBConnection} from '../DBController';
import { TransactionType } from '../../transaction/TransactionTypes';
export interface ISummary {
  totalExpense?: number;
  totalIncome?: number;
  monthlyExpense?: number;
  monthlyIncome?: number;
}

export const getSummary = async (): Promise<ISummary | undefined> => {
  try {
    let meta: ISummary = {};
    try {
      const db = await getDBConnection();
      const query = `SELECT * from 
      (SELECT IFNULL(SUM(AMOUNT), 0) as totalExpense from ${TNAME_TRANSACTIONS} WHERE TRANSACTION_TYPE='${TransactionType.EXPENSE}' ) e 
      LEFT JOIN (SELECT IFNULL(SUM(AMOUNT), 0) as totalIncome from ${TNAME_TRANSACTIONS} WHERE TRANSACTION_TYPE='${TransactionType.INCOME}' ) i 
      LEFT JOIN (SELECT IFNULL(SUM(AMOUNT), 0) as monthlyExpense from ${TNAME_TRANSACTIONS} where strftime('%Y-%m', DATE_ADDED_TLM)=strftime('%Y-%m','now') AND TRANSACTION_TYPE='${TransactionType.EXPENSE}' ) em 
      LEFT JOIN (SELECT IFNULL(SUM(AMOUNT), 0) as monthlyIncome from ${TNAME_TRANSACTIONS} where strftime('%Y-%m', DATE_ADDED_TLM)=strftime('%Y-%m','now') AND TRANSACTION_TYPE='${TransactionType.INCOME}' ) im `;
      const results = await db.executeSql(query);
      results.forEach((result: any) => {
        for (let index = 0; index < result.rows.length; index++) {
          meta = result.rows.item(index) as ISummary;
        }
      });
      return meta;
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
    throw Error('Failed to get getSummary !!!');
  }
};
