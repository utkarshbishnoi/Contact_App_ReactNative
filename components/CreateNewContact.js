import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import Contact from '../model/contactModel';
import {insertContact, createTable, getAllContacts} from '../database/crud';

const CreateNewContact = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [photo, setPhoto] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    createTable().then(() => console.log('Table created successfully'));
  }, []);
  const handleSaveContact = async () => {
    try {
      if (!name || !mobile) {
        console.warn('Name and Mobile should not be empty');
        return;
      }
      const contact = new Contact(
        null,
        name,
        mobile,
        landline,
        photo || defaultPhotoUrl,
        favorite,
      );
      //console.log('Contact:', contact);
      await insertContact(contact);
      navigation.navigate('Contact List');
    } catch (error) {
      console.error('Error saving contact:', error);
    }
    const defaultPhotoUrl =
      'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        style={styles.input}
      />
      <TextInput
        placeholder="Landline (optional)"
        value={landline}
        onChangeText={setLandline}
        style={styles.input}
      />

      <TextInput
        placeholder="Photo URL (optional)"
        value={photo}
        onChangeText={setPhoto}
        style={styles.input}
      />

      <View style={styles.favoriteContainer}>
        <Text style={styles.favoriteText}>Favorite:</Text>
        <Switch
          value={favorite}
          onValueChange={setFavorite}
          style={styles.switch}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveContact}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  photoButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  favoriteText: {
    fontSize: 18,
    marginRight: 10,
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

export default CreateNewContact;
