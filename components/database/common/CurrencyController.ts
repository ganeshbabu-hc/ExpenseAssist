import {TNAME_CURRENCY_TYPES} from '../../utils/Constants';
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
        `SELECT * FROM ${TNAME_CURRENCY_TYPES}`,
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
