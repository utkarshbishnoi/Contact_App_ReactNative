import db from './database';
import Contact from '../model/contactModel';

export function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, landline TEXT, photo TEXT, favorite INTEGER);',
        () => resolve(),
        error => reject(error),
      );
    });
  });
}
export function insertContact(contact) {
  return new Promise((resolve, reject) => {
    if (!contact || !contact.name || !contact.mobile) {
      reject(new Error('Contact object must have name and mobile properties'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO contacts (name, mobile, landline, photo, favorite) VALUES (?,?,?,?,?);',
        [
          contact.name,
          contact.mobile,
          contact.landline || '',
          contact.photo || '',
          contact.favorite ? 1 : 0,
        ],
        (_, {insertId}) => resolve(insertId),
        error => {
          reject(error);
        },
      );
    });
  });
}

export function updateContact(contact) {
  if (!contact || !contact.id || !contact.name || !contact.mobile) {
    throw new Error('Contact object must have id, name, and mobile properties');
  }
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contacts SET name =?, mobile =?, landline =?, photo =?, favorite =? WHERE id =?;',
        [
          contact.name,
          contact.mobile,
          contact.landline,
          contact.photo,
          contact.favorite ? 1 : 0,
          contact.id,
        ],
        () => resolve(),
        error => reject(error),
      );
    });
  });
}

export function deleteContact(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM contacts WHERE id =?;',
        [id],
        () => resolve(),
        error => reject(error),
      );
    });
  });
}
export function getAllContacts() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts;',
        [],
        (_, {rows}) => {
          const contacts = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            contacts.push(
              new Contact(
                row.id,
                row.name,
                row.mobile,
                row.landline,
                row.photo,
                row.favorite,
              ),
            );
          }
          resolve(contacts);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
export function getFavoriteContacts() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE favorite = 1;',
        [],
        (_, {rows}) => {
          const favoriteContacts = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const contact = new Contact(
              row.id,
              row.name,
              row.mobile,
              row.landline,
              row.photo,
              row.favorite,
            );
            favoriteContacts.push(contact);
          }
          resolve(favoriteContacts);
        },
        error => reject(error),
      );
    });
  });
}
export function searchContacts(query) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE name LIKE ? OR mobile LIKE ?;',
        [`%${query}%`, `%${query}%`],
        (_, {rows}) => {
          const contacts = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            contacts.push(
              new Contact(
                row.id,
                row.name,
                row.mobile,
                row.landline,
                row.photo,
                row.favorite,
              ),
            );
          }
          resolve(contacts);
        },
        error => reject(error),
      );
    });
  });
}
export function searchFavoriteContacts(query) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE favorite = 1 AND(name LIKE ? OR mobile LIKE ?);',
        [`%${query}%`, `%${query}%`],
        (_, {rows}) => {
          const contacts = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            contacts.push(
              new Contact(
                row.id,
                row.name,
                row.mobile,
                row.landline,
                row.photo,
                row.favorite,
              ),
            );
          }
          resolve(contacts);
        },
        error => reject(error),
      );
    });
  });
}
