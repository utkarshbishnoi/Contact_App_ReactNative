import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'contacts.db', location: 'default'},
  () => {},
  error => {
    console.log(error);
  },
);

export default db;
