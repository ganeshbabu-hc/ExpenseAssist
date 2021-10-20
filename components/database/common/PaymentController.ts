import {TNAME_PAYMENT_TYPES} from '../../utils/Constants';
import {getDBConnection} from '../DBController';

export interface IPayment {
  paymentId: number;
  title: string;
  description: string;
  dateAddedTlm: string;
  dateUpdatedTlm: string;
  paymentIcon: string;
}

export const getPaymentTypes = async (): Promise<IPayment[]> => {
  try {
    const payments: IPayment[] = [];
    try {
      const db = await getDBConnection();
      const results = await db.executeSql(
        `SELECT PAYMENT_ID as paymentId,TITLE as title, DESCRIPTION as description,DATE_ADDED_TLM as dateAddedTlm, DATE_UPDATED_TLM as dateUpdatedTlm, PAYMENT_ICON as paymentIcon FROM ${TNAME_PAYMENT_TYPES}`,
      );
      results.forEach((result: any) => {
        for (let index = 0; index < result.rows.length; index++) {
          payments.push(result.rows.item(index));
        }
      });
      return payments;
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
    throw Error('Failed to get currencies !!!');
  }
};
