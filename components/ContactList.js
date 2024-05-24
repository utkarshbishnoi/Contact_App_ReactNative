import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {getAllContacts, deleteContact, searchContacts} from '../database/crud';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from '@react-navigation/native';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getAllContacts()
      .then(rows => {
        if (rows && rows.length > 0) {
          setContacts(rows);
        }
      })
      .catch(error => {
        console.error(
          'Error fetching contacts at contact list component:',
          error,
        );
      });
  }, []);
  const handleSearch = text => {
    setSearchQuery(text);
    if (text === '') {
      getAllContacts()
        .then(setContacts)
        .catch(error => console.error('Error fetching contacts:', error));
    } else {
      searchContacts(text)
        .then(filteredContacts => {
          setContacts(filteredContacts);
        })
        .catch(error => console.error('Error searching contacts:', error));
    }
  };

  const handleDelete = id => {
    deleteContact(id)
      .then(() => {
        getAllContacts().then(rows => {
          setContacts(rows);
        });
      })
      .catch(error => console.error('Error deleting contact:', error));
  };

  const renderContact = ({item}) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <View style={styles.rightAction}>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{fontSize: 13, color: 'white'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}>
        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => navigation.navigate('UpdateContact', {contact: item})}>
          <Image
            source={
              item.photo
                ? {uri: item.photo}
                : {uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
            }
            style={styles.contactPhoto}
          />
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactMobile}>{item.mobile}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateContact')}>
        <Image
          source={{
            uri: 'https://www.freepnglogos.com/uploads/plus-icon/add-big-new-plus-icon-3.png',
          }}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contactPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactMobile: {
    fontSize: 16,
    color: '#666',
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});

export default ContactList;
