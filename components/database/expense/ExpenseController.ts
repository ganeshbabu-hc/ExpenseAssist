import {IExpense} from './ExpenseTypes';
import {EXPENSE_TABLE_NAME} from '../../utils/Constants';
import {getDBConnection} from '../DBController';

export const saveExpense = async (expense: IExpense[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${EXPENSE_TABLE_NAME}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, EXPENSE_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM) values` +
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
    const results = await db.executeSql(`SELECT * FROM ${EXPENSE_TABLE_NAME}`);
    // console.log('---getExpenses---');
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        console.log('---result---', result.rows.item(index));
        expenses.push(result.rows.item(index));
      }
    });
    return expenses;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get expenses !!!');
  }
};
