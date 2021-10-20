import {IExpense, IExpenseCategory, ExpenseCategory} from './ExpenseTypes';
import {
  EXPENSE_QUERY_LIMIT,
  TNAME_CURRENCY_TYPES,
  TNAME_EXPENSE,
  TNAME_EXPENSE_CATEGORIES,
  TNAME_PAYMENT_TYPES,
} from '../../utils/Constants';
import {getDBConnection} from '../DBController';

export const saveExpense = async (expense: IExpense[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_EXPENSE}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, EXPENSE_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM) values` +
    expense
      .map(
        i =>
          `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${i.expenseCategoryId}, '${i.description}', '${i.dateAddedTlm}', CURRENT_TIMESTAMP)`,
      )
      .join(',');
  console.log(insertQuery);
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};


export const getExpenses = async (limit?: number): Promise<IExpense[]> => {
  try {
    const expenses: IExpense[] = [];
    const db = await getDBConnection();
    const dataLimit = limit ?? EXPENSE_QUERY_LIMIT;
    const results = await db.executeSql(
      `SELECT 
      ex.EXPENSE_ID as expenseId,
      ex.PAYMENT_ID as paymentId,
      ex.TITLE as title,
      ex.DESCRIPTION as description,
      ex.EXPENSE_CATEGORY_ID as expenseCategoryId,
      ex.AMOUNT as amount,
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
      ORDER BY ex.DATE_ADDED_TLM DESC 
      LIMIT ${dataLimit}`,
    );

    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        console.log('---result---', result.rows.item(index));
        expenses.push(result.rows.item(index));
      }
    });
    console.log(expenses);
    return expenses;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get expenses !!!');
  }
};

export const getExpenseCaetegories = async (): Promise<IExpenseCategory[]> => {
  try {
    const categories: IExpenseCategory[] = [];
    const db = await getDBConnection();
    const results = await db.executeSql(
      `SELECT TITLE as title, DESCRIPTION as decsription, EXPENSE_CATEGORY_ID as expenseCategoryId, DATE_ADDED_TLM as dateAddedTlm, DATE_UPDATED_TLM as dateUpdatedTlm, CATEGORY_ICON as categoryIcon FROM ${TNAME_EXPENSE_CATEGORIES}`,
    );
    // console.log('---getExpenses---');
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        categories.push(result.rows.item(index));
      }
    });
    // console.log('---getExpenses---', categories);
    return categories;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get categories !!!');
  }
};
