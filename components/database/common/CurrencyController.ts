import {
  TNAME_CONFIGURATION,
  TNAME_CURRENCY_TYPES,
  TNAME_INCOME_CATEGORIES,
} from '../../utils/Constants';
import {getDBConnection} from '../DBController';
export interface ICurrency {
  currencyId?: number;
  name: string;
  code: string;
  symbol: string;
  dateAddedTlm: string;
}

export const getCurrncyTypes = async (): Promise<ICurrency[]> => {
  try {
    const currencies: ICurrency[] = [];
    try {
      const db = await getDBConnection();
      const results = await db.executeSql(
        `SELECT CODE as code, NAME as name, CURRENCY_ID as currencyId, SYMBOL as symbol FROM ${TNAME_CURRENCY_TYPES} ORDER BY NAME`,
      );
      results.forEach((result: any) => {
        for (let index = 0; index < result.rows.length; index++) {
          currencies.push(result.rows.item(index));
        }
      });
      return currencies;
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
    throw Error('Failed to get currencies !!!');
  }
};

export const setCurrency = async (currency: ICurrency): Promise<any> => {
  try {
    const updateQuery = `UPDATE ${TNAME_CONFIGURATION} SET VALUE='${JSON.stringify(
      currency,
    )}', DATE_UPDATED_TLM = CURRENT_TIMESTAMP WHERE NAME='currency'`;
    const db = await getDBConnection();
    return db.executeSql(updateQuery);
  } catch (error) {
    console.log(error);
    throw Error('Failed to get currencies !!!');
  }
};
