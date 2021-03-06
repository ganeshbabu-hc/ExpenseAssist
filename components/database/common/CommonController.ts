import {
  TNAME_CONFIGURATION,
  TNAME_TRANSACTION_CATEGORIES,
  TNAME_TRANSACTIONS,
} from '../../utils/Constants';
import { getDBConnection } from '../DBController';
import { ITransactionCategory } from '../../transaction/TransactionTypes';

export interface IConfiguration {
  name: string;
  value: any;
  type: string;
  description?: string;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
}

export const getConfigurations = async () => {
  const query = `SELECT NAME as name,TYPE as type, VALUE as value, DESCRIPTION as description from ${TNAME_CONFIGURATION}`;
  const configs: any = {};
  const db = await getDBConnection();
  const results = await db.executeSql(query);
  results.forEach((result: any) => {
    for (let index = 0; index < result.rows.length; index++) {
      const config: IConfiguration = result.rows.item(index) as IConfiguration;
      switch (config.type) {
        case 'json':
          config.value = JSON.parse(config.value);
          break;
        default:
          break;
      }
      configs[config.name] = config;
    }
  });
  return configs;
};

export const saveTransactionCategory = async (
  category: ITransactionCategory,
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${TNAME_TRANSACTION_CATEGORIES}(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_TYPE, EDITABLE) values` +
    `('${category.title}', '${category.description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${category.transactionType}', ${category.editable})`;
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const setThemeConfig = async (themeName: string): Promise<any> => {
  try {
    const updateQuery = `UPDATE ${TNAME_CONFIGURATION} SET VALUE='${themeName}', DATE_UPDATED_TLM = CURRENT_TIMESTAMP WHERE NAME='theme'`;
    const db = await getDBConnection();
    return await db.executeSql(updateQuery);
  } catch (error) {
    console.log(error);
    throw Error('Failed to get currencies !!!');
  }
};

export const getThemeConfig = async (): Promise<any> => {
  try {
    const updateQuery = `SELECT VALUE as themeName FROM ${TNAME_CONFIGURATION} WHERE NAME='theme'`;
    const db = await getDBConnection();
    const results = await db.executeSql(updateQuery);
    let themeName = 'lightPurple';
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        themeName = result.rows.item(index).themeName;
        return;
      }
    });
    return themeName;
  } catch (error) {
    console.log(error);
    throw Error('Failed to get currencies !!!');
  }
};

// export const trucateTable = async () => {
//   // console.log('In trucateTable table');
//   const insertQuery = `DELETE FROM ${TNAME_TRANSACTIONS}`;
//   const db = await getDBConnection();
//   const result = await db.executeSql(insertQuery);
//   // console.log('trucateTable', result);
// };

// export const addThemeConfig = async () => {
//   const insertQuery =
//     'INSERT INTO ${TNAME_CONFIGURATION}(NAME, DESCRIPTION, TYPE, VALUE, DATE_ADDED_TLM, DATE_UPDATED_TLM) VALUES ("theme", "","string", \'lighturple\',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)';
//   const db = await getDBConnection();
//   const result = await db.executeSql(insertQuery);
//   console.log('addThemeConfig', result);
// };
// export const dropTables = async () => {
//   // console.log('In dropTables table');
//   const insertQuery = `DROP TABLE ${TNAME_CONFIGURATION}`;
//   const db = await getDBConnection();
//   const result = await db.executeSql(insertQuery);
// };

// export const createConfigTable = async () => {
//   // console.log('In creating the config table');
//   const insertQuery = `CREATE TABLE CONFIGURATION (
//       CONFIGURATION_ID INTEGER PRIMARY KEY AUTOINCREMENT,
//       NAME text NOT NULL,
//       DESCRIPTION text,
//       TYPE text NOT NULL DEFAULT 'string',
//       VALUE text NOT NULL DEFAULT '',
//       DATE_ADDED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       DATE_UPDATED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
//     )`;
//   const db = await getDBConnection();
//   const result = await db.executeSql(insertQuery);
//   // console.log('createConfigTable', result);
// };

// export const createImageTable = async () => {
//   // console.log('In creating the config table');
//   const insertQuery = `CREATE TABLE TRANSACTION_IMAGES (
//     IMAGE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
//     TRANSACTION_ID text NOT NULL,
//     IMAGE BLOB NOT NULL,
//     DATE_ADDED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     DATE_UPDATED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY(TRANSACTION_ID) REFERENCES TRANSACTION_CATEGORIES(TRANSACTION_ID)
//   );`;
//   const db = await getDBConnection();
//   const result = await db.executeSql(insertQuery);
//   // console.log('createConfigTable', result);
// };

// export const addColumn = async () => {
//   const query = 'ALTER TABLE TRANSACTIONS  ADD COLUMN PINNED NUMBER DEFAULT 0;';
//   const db = await getDBConnection();
//   const result = await db.executeSql(query);
//   console.log(result);
// };

// export const insertStatements = async () => {
//   // console.log('In insertStatements config table');
//   const insertQuery =
//     'INSERT OR REPLACE INTO CONFIGURATION(NAME, DESCRIPTION, TYPE, VALUE, DATE_ADDED_TLM, DATE_UPDATED_TLM) VALUES (\'currency\', \'\',\'json\', \'{"code":"INR","currencyId":47,"name":"Rupees","symbol":"???"}\',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);';
//   const db = await getDBConnection();
//   const result = await db.executeSql(insertQuery);
//   // console.log('insertStatements', result);
// };

export const resetDatabase = async () => {
  // console.log('In resetting DB table');
  const query = `
  
DROP TABLE IF EXISTS EXPENSE_ASSIST.CURRENCY_TYPES;
DROP TABLE IF EXISTS EXPENSE_ASSIST.PAYMENT_TYPES;
DROP TABLE IF EXISTS EXPENSE_ASSIST.EXPENSE;
DROP TABLE IF EXISTS EXPENSE_ASSIST.EXPENSE_CATEGORIES;
DROP TABLE IF EXISTS EXPENSE_ASSIST.INCOME;
DROP TABLE IF EXISTS EXPENSE_ASSIST.INCOME_CATEGORIES;
DROP TABLE IF EXISTS EXPENSE_ASSIST.CONFIGURATION;

CREATE TABLE CURRENCY_TYPES (
	CURRENCY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	NAME text NOT NULL,
	CODE text NOT NULL,
	SYMBOL text NOT NULL,
	DATE_ADDED_TLM DATE NOT NULL
);

CREATE TABLE PAYMENT_TYPES (
	PAYMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	DESCRIPTION text,
	EDITABLE INTEGER NOT NULL DEFAULT 0,
	DATE_ADDED_TLM DATE NOT NULL,
	DATE_UPDATED_TLM DATE NOT NULL,
    PAYMENT_ICON TEXT NOT NULL DEFAULT 'payment'
);

CREATE TABLE CONFIGURATION (
	CONFIGURATION_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	NAME text NOT NULL,
	DESCRIPTION text,
	TYPE text NOT NULL DEFAULT 'string',
	VALUE text NOT NULL DEFAULT '',
	DATE_ADDED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	DATE_UPDATED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE EXPENSE (
	EXPENSE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	AMOUNT UNSIGNED BIG INT NOT NULL,
	PAYMENT_ID INTEGER NOT NULL,
	TRANSACTION_CATEGORY_ID INTEGER NOT NULL,
	DESCRIPTION text,
  	CURRENCY_ID INTEGER NOT NULL,
	DATE_ADDED_TLM DATE NOT NULL,
	DATE_UPDATED_TLM DATE NOT NULL,
	FOREIGN KEY(TRANSACTION_CATEGORY_ID) REFERENCES EXPENSE_CATEGORIES(TRANSACTION_CATEGORY_ID),
	FOREIGN KEY(PAYMENT_ID) REFERENCES PAYMENT_TYPES(PAYMENT_ID),
	FOREIGN KEY(CURRENCY_ID) REFERENCES CURRENCY_TYPES(CURRENCY_ID)
);

CREATE TABLE EXPENSE_CATEGORIES (
	TRANSACTION_CATEGORY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	DESCRIPTION text,
	EDITABLE INTEGER NOT NULL DEFAULT 0,
	DATE_ADDED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	DATE_UPDATED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CATEGORY_ICON TEXT DEFAULT 'cash-minus'
);

CREATE TABLE INCOME (
	INCOME_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	AMOUNT UNSIGNED BIG INT NOT NULL,
	PAYMENT_ID INTEGER NOT NULL,
	TRANSACTION_CATEGORY_ID INTEGER NOT NULL,
	DESCRIPTION text,
  	CURRENCY_ID INTEGER NOT NULL,
	DATE_ADDED_TLM DATE NOT NULL,
	DATE_UPDATED_TLM DATE NOT NULL,
	FOREIGN KEY(TRANSACTION_CATEGORY_ID) REFERENCES INCOME_CATEGORIES(TRANSACTION_CATEGORY_ID),
	FOREIGN KEY(PAYMENT_ID) REFERENCES PAYMENT_TYPES(PAYMENT_ID),
	FOREIGN KEY(CURRENCY_ID) REFERENCES CURRENCY_TYPES(CURRENCY_ID)
);


CREATE TABLE INCOME_CATEGORIES (
	TRANSACTION_CATEGORY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	DESCRIPTION text,
	EDITABLE INTEGER NOT NULL DEFAULT 0,
	DATE_ADDED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	DATE_UPDATED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CATEGORY_ICON TEXT DEFAULT 'cash-plus'
);

--currency 
INSERT INTO CONFIGURATION(NAME, DESCRIPTION, TYPE, VALUE, DATE_ADDED_TLM, DATE_UPDATED_TLM) VALUES ("currency", "","json", '{"code":"INR","currencyId":47,"name":"Rupees","symbol":"???"}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

-- Income categories
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Salary", "Income by salary",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"account-cash", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Cash", "Cash Income",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"cash", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Awards", "Awars Income",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"award", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Allowance", "Allowance income",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"hand-holding-usd", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Bonus", "Bonus income",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"sale", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Cashback", "Income by cashback",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"cash-refund", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Capital Gains", "Income by capital gains",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"chart-line", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Sales", "Income by sales",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"business", 0);
INSERT INTO INCOME_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Other", "Other income",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"cash-plus", 0);

-- Expense categories
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Food", "Food related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"fastfood", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Shopping", "Shopping expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"shopping-bag", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Transport", "Transport related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"emoji-transportation", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Social", "Social related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"groups", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Household", "Household expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"store", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Health", "Health expenses like, medical insurance, health checkup",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"local-hospital", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Gift", "Transport related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"gift", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Education", "Education expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"school", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Beauty", "Beauty/fashion expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"person", 0);
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON, EDITABLE) VALUES ("Other", "Other expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"cash-minus", 0);


-- Payment tyes
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON, EDITABLE) VALUES ("Cash", "Cash payment, like GooglePay.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"cash", 0);
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON, EDITABLE) VALUES ("Account", "Pais by bank account.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"account-balance", 0);
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON, EDITABLE) VALUES ("UPI", "UPI payments, like Google Pay.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"touch-app", 0);
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON, EDITABLE) VALUES ("Card", "Credit/Debit card payment.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"credit-card", 0);



-- Currency types
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Leke', 'ALL', 'Lek', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'USD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Afghanis', 'AFN', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'ARS', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guilders', 'AWG', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'AUD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Manats', 'AZN', '??????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BSD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BBD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rubles', 'BYR', 'p.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Euro', 'EUR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BZD', 'BZ$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BMD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bolivianos', 'BOB', '$b', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Convertible Marka', 'BAM', 'KM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pula', 'BWP', 'P', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Leva', 'BGN', '????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Reais', 'BRL', 'R$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'GBP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BND', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Riels', 'KHR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'CAD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'KYD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'CLP', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Yuan Renminbi', 'CNY', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'COP', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Col??n', 'CRC', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kuna', 'HRK', 'kn', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'CUP', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Koruny', 'CZK', 'K??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kroner', 'DKK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'DOP ', 'RD$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'XCD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'EGP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Colones', 'SVC', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'FKP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'FJD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Cedis', 'GHC', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'GIP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Quetzales', 'GTQ', 'Q', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'GGP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'GYD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Lempiras', 'HNL', 'L', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'HKD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Forint', 'HUF', 'Ft', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kronur', 'ISK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'INR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupiahs', 'IDR', 'Rp', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'IRR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'IMP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Shekels', 'ILS', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'JMD', 'J$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Yen', 'JPY', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'JEP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tenge', 'KZT', '????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Won', 'KPW', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Won', 'KRW', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Soms', 'KGS', '????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kips', 'LAK', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Lati', 'LVL', 'Ls', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'LBP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'LRD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Switzerland Francs', 'CHF', 'CHF', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Litai', 'LTL', 'Lt', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Denars', 'MKD', '??????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ringgits', 'MYR', 'RM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'MUR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'MXN', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tugriks', 'MNT', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Meticais', 'MZN', 'MT', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'NAD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'NPR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guilders', 'ANG', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'NZD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Cordobas', 'NIO', 'C$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Nairas', 'NGN', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Krone', 'NOK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'OMR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'PKR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Balboa', 'PAB', 'B/.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guarani', 'PYG', 'Gs', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Nuevos Soles', 'PEN', 'S/.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'PHP', 'Php', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zlotych', 'PLN', 'z??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'QAR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Lei', 'RON', 'lei', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rubles', 'RUB', '??????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'SHP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Riyals', 'SAR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dinars', 'RSD', '??????.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'SCR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'SGD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'SBD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Shillings', 'SOS', 'S', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rand', 'ZAR', 'R', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'LKR', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kronor', 'SEK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'SRD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'SYP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Dollars', 'TWD', 'NT$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Baht', 'THB', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'TTD', 'TT$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Lira', 'TRY', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Liras', 'TRL', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'TVD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Hryvnia', 'UAH', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'UYU', '$U', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Sums', 'UZS', '????', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bolivares Fuertes', 'VEF', 'Bs', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dong', 'VND', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'YER', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zimbabwe Dollars', 'ZWD', 'Z$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Algerian dinar', 'DZD', 'DA', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Angolan kwanza', 'AOA', 'Kz', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Armenian dram', 'AMD', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bahraini dinar', 'BHD', 'BD', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bangladeshi taka', 'BDT', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('West African CFA franc', 'XOF', 'CFA', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Burundian franc', 'BIF', 'FBu', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Central African CFA franc', 'XAF', 'FCFA', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Cape Verdean escudo', 'CVE', 'Esc', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Comorian franc', 'KMF', 'CF', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Djiboutian franc', 'DJF', 'Fdj', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dominican peso', 'DOP', 'RD$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Eritrean nakfa', 'ERN', 'Nkf', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ethiopian birr', 'ETB', 'Br', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('CFP franc', 'XPF', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Gambian dalasi', 'GMD', 'D', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Georgian lari', 'GEL', '???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ghanaian cedi', 'GHS', 'GH???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guinean franc', 'GNF', 'FG', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Iraqi dinar', 'IQD', '??.??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Jordanian dinar', 'JOD', '??.??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kenyan shilling', 'KES', 'Ksh', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kuwaiti dinar', 'KWD', '??.??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Libyan dinar', 'LYD', '??.??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Macanese pataca', 'MOP', 'MOP$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Malagasy ariary', 'MGA', 'Ar', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Malawian kwacha', 'MWK', 'MK', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Maldivian rufiyaa', 'MVR', 'Rf', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Mauritanian ouguiya', 'MRO', 'UM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Moldovan leu', 'MDL', 'L', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Moroccan dirham', 'MAD', 'MAD', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Myanmar kyat', 'MMK', 'K', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Papua New Guinean kina', 'PGK', 'K', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rwandan franc', 'RWF', 'R???', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Samoan t??l??', 'WST', 'WS$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('S??o Tom?? and Pr??ncipe dobra', 'STD', 'Db', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Sierra Leonean leone', 'SLL', 'Le', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('South Sudanese pound', 'SSP', '??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Sudanese pound', 'SDG', '??.??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Swazi lilangeni', 'SZL', 'L', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tajikistani somoni', 'TJS', '??M', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tanzanian shilling', 'TZS', 'TSh', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tongan pa??anga', 'TOP', 'T$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tunisian dinar', 'TND', 'DT', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Turkmenistani manat', 'TMT', 'T', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ugandan shilling', 'UGX', 'USh', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('United Arab Emirates dirham', 'AED', '??.??', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Vanuatu vatu', 'VUV', 'VT', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zambian kwacha', 'ZMW', 'ZK', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zimbabwean dollar', 'ZWL', '$', CURRENT_TIMESTAMP);
`;
  const db = await getDBConnection();
  const result = await db.executeSql(query);
  // console.log('reset Databse', result);
};

// export const saveIncomeCategory = async (category: IExpense[]) => {
//   const insertQuery =
//     `INSERT OR REPLACE INTO ${TNAME_TRANSACTION_CATEGORIES}(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM) values` +
//     expense
//       .map(
//         i =>
//           `('${i.title}', ${i.amount}, ${i.paymentId}, ${i.currencyId},${i.transactionCategoryId}, '${i.description}', '${i.dateAddedTlm}', CURRENT_TIMESTAMP)`,
//       )
//       .join(',');
//   const db = await getDBConnection();
//   return db.executeSql(insertQuery);
// };

// export const updateCategory = async (expense: IExpense) => {
//   const insertQuery = `UPDATE ${TNAME_EXPENSE}
//   SET TITLE='${expense.title}',
//   AMOUNT=${expense.amount},
//   PAYMENT_ID=${expense.paymentId},
//   CURRENCY_ID=${expense.currencyId},
//   TRANSACTION_CATEGORY_ID=${expense.transactionCategoryId},
//   DESCRIPTION='${expense.description}',
//   DATE_ADDED_TLM='${expense.dateAddedTlm}',
//   DATE_UPDATED_TLM=CURRENT_TIMESTAMP
//   WHERE EXPENSE_ID=${expense.expenseId}`;
//   const db = await getDBConnection();
//   return db.executeSql(insertQuery);
// };

// export const getTransactions = async (limit?: number): Promise<IExpense[]> => {
//   try {
//     const expenses: IExpense[] = [];
//     const db = await getDBConnection();
//     const dataLimit = limit ?? EXPENSE_QUERY_LIMIT;
//     const results = await db.executeSql(
//       `SELECT
//       ex.EXPENSE_ID as expenseId,
//       ex.PAYMENT_ID as paymentId,
//       ex.TITLE as title,
//       ex.DESCRIPTION as description,
//       ex.TRANSACTION_CATEGORY_ID as transactionCategoryId,
//       ex.AMOUNT as amount,
//       ex.CURRENCY_ID as currencyId,
//       ex.DATE_ADDED_TLM as dateAddedTlm,
//       ex.DATE_UPDATED_TLM as dateUpdatedTlm,
//       ec.TITLE as transactionCategoryTitle,
//       ec.CATEGORY_ICON as transactionCategoryIcon,
//       pt.TITLE as paymentTitle,
//       ct.SYMBOL as currencySumbol
//       FROM ${TNAME_EXPENSE} ex
//       LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID
//       LEFT JOIN ${TNAME_TRANSACTION_CATEGORIES} ec ON ex.TRANSACTION_CATEGORY_ID = ec.TRANSACTION_CATEGORY_ID
//       LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID
//       ORDER BY ex.DATE_ADDED_TLM DESC
//       LIMIT ${dataLimit}`,
//     );

//     results.forEach((result: any) => {
//       for (let index = 0; index < result.rows.length; index++) {
//         const expense: IExpense = result.rows.item(index) as IExpense;
//         expenses.push(expense);
//       }
//     });
//     return expenses;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get expenses !!!');
//   }
// };

// export const removeCategory = async (expenseIds: number): Promise<any> => {
//   try {
//     const db = await getDBConnection();
//     const deleteQuery = `DELETE from ${TNAME_EXPENSE} where EXPENSE_ID = ${expenseIds}`;
//     const results = await db.executeSql(deleteQuery);
//     return results;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to remove expense !!!');
//   }
// };
