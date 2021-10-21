import {IIncome, IIncomeCategory} from './IncomeTypes';
import {
  INCOME_QUERY_LIMIT,
  TNAME_CURRENCY_TYPES,
  TNAME_INCOME,
  TNAME_INCOME_CATEGORIES,
  TNAME_PAYMENT_TYPES,
} from '../../utils/Constants';
import {getDBConnection} from '../DBController';

export const saveIncome = async (income: IIncome[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_INCOME}(TITLE, AMOUNT, PAYMENT_ID, CURRENCY_ID, INCOME_CATEGORY_ID, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM) values` +
    income
      .map(
        i =>
          `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${i.incomeCategoryId}, '${i.description}', '${i.dateAddedTlm}', CURRENT_TIMESTAMP)`,
      )
      .join(',');
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const getIncomes = async (limit?: number): Promise<IIncome[]> => {
  try {
    const incomes: IIncome[] = [];
    const db = await getDBConnection();
    const dataLimit = limit ?? INCOME_QUERY_LIMIT;
    const results = await db.executeSql(
      `SELECT 
      ex.INCOME_ID as incomeId,
      ex.PAYMENT_ID as paymentId,
      ex.TITLE as title,
      ex.DESCRIPTION as description,
      ex.INCOME_CATEGORY_ID as incomeCategoryId,
      ex.AMOUNT as amount,
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
      ORDER BY ex.DATE_ADDED_TLM ASC 
      LIMIT ${dataLimit}`,
    );
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        const income: IIncome = result.rows.item(index) as IIncome;
        incomes.push(income);
      }
    });
    return incomes;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get incomes !!!');
  }
};

export const getIncomeCaetegories = async (): Promise<IIncomeCategory[]> => {
  try {
    const categories: IIncomeCategory[] = [];
    const db = await getDBConnection();
    const results = await db.executeSql(
      `SELECT TITLE as title, DESCRIPTION as decsription, INCOME_CATEGORY_ID as incomeCategoryId, DATE_ADDED_TLM as dateAddedTlm, DATE_UPDATED_TLM as dateUpdatedTlm, CATEGORY_ICON as categoryIcon FROM ${TNAME_INCOME_CATEGORIES}`,
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

export const removeIncomes = async (incomeIds: number): Promise<any> => {
  try {
    const db = await getDBConnection();
    const deleteQuery = `DELETE from ${TNAME_INCOME} where INCOME_ID = ${incomeIds}`;
    const results = await db.executeSql(deleteQuery);
    return results;
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove income !!!');
  }
};
