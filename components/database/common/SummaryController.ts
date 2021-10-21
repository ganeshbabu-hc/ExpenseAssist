import {TNAME_EXPENSE, TNAME_INCOME} from '../../utils/Constants';
import {getDBConnection} from '../DBController';
export interface ISummary {
  totalExpense?: number;
  totalIncome?: number;
  monthlyExpense?: number;
  monthlyIncome?: number;
}

export const getSummary = async (): Promise<ISummary> => {
  try {
    let meta: ISummary = {};
    try {
      const db = await getDBConnection();
      const query = `SELECT * from 
      (SELECT SUM(AMOUNT) as totalExpense from ${TNAME_EXPENSE}) e 
      LEFT JOIN (SELECT SUM(AMOUNT) as totalIncome from ${TNAME_INCOME}) i 
      LEFT JOIN (SELECT SUM(AMOUNT) as monthlyExpense from ${TNAME_EXPENSE} where strftime('%Y-%m', DATE_ADDED_TLM)=strftime('%Y-%m','now')) em 
      LEFT JOIN (SELECT SUM(AMOUNT) as monthlyIncome from ${TNAME_INCOME} where strftime('%Y-%m', DATE_ADDED_TLM)=strftime('%Y-%m','now')) im `;
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
