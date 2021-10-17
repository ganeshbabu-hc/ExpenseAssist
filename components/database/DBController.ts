import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export let databseConnection: SQLiteDatabase;
export const getDBConnection = async () => {
  if (!databseConnection) {
    databseConnection = await openDatabase(
      {
        name: 'EXPENSE_ASSIST.db',
        createFromLocation: '~www/EXPENSE_ASSIST.db',
        location: 'default',
      },
      () => {
        console.log('database connection opened');
      },
      err => {
        console.log('database connection failed to open', err);
      },
    );
    return databseConnection;
  }
  return databseConnection;
};

// export const createTable = async (db: SQLiteDatabase) => {
//   // create table if not exists
//   const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
//           value TEXT NOT NULL
//       );`;

//   await db.executeSql(query);
// };

// export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
//   try {
//     const todoItems: ToDoItem[] = [];
//     const results = await db.executeSql(
//       `SELECT rowid as id,value FROM ${tableName}`,
//     );
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         todoItems.push(result.rows.item(index));
//       }
//     });
//     return todoItems;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get todoItems !!!');
//   }
// };

// export const saveTodoItems = async (
//   db: SQLiteDatabase,
//   todoItems: ToDoItem[],
// ) => {
//   const insertQuery =
//     `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
//     todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

//   return db.executeSql(insertQuery);
// };

// export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// };

// export const deleteTable = async (db: SQLiteDatabase) => {
//   const query = `drop table ${tableName}`;

//   await db.executeSql(query);
// };
