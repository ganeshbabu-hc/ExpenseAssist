import {IExpense} from './ExpenseTypes';
import {TNAME_EXPENSE, TNAME_EXPENSE_CATEGORIES} from '../../utils/Constants';
import {getDBConnection} from '../DBController';

export const saveExpense = async (expense: IExpense[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_EXPENSE}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, EXPENSE_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM) values` +
    expense
      .map(
        i =>
          `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${i.expenseCategoryId}, '${i.description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      )
      .join(',');
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const getExpenses = async (): Promise<IExpense[]> => {
  try {
    const expenses: IExpense[] = [];
    const db = await getDBConnection();
    const results = await db.executeSql(`SELECT * FROM ${TNAME_EXPENSE}`);
    // console.log('---getExpenses---');
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        // console.log('---result---', result.rows.item(index));
        expenses.push(result.rows.item(index));
      }
    });
    return expenses;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get expenses !!!');
  }
};

export const getExpenseCaetegories = async (): Promise<IExpense[]> => {
  try {
    const categories: IExpense[] = [];
    const db = await getDBConnection();
    const results = await db.executeSql(
      `SELECT * FROM ${TNAME_EXPENSE_CATEGORIES}`,
    );
    // console.log('---getExpenses---');
    results.forEach((result: any) => {
      console.log('---getExpenseCaetegories---', result.rows.length);
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
