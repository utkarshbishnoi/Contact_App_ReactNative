import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import db from '../database/database';
import Contact from '../model/contactModel';
import {updateContact, deleteContact, getAllContacts} from '../database/crud';

const UpdateContact = ({route, navigation}) => {
  const [name, setName] = useState(route.params.contact.name);
  const [mobile, setMobile] = useState(route.params.contact.mobile);
  const [landline, setLandline] = useState(route.params.contact.landline);
  const [photo, setPhoto] = useState(route.params.contact.photo);
  const [favorite, setFavorite] = useState(
    route.params.contact.favorite === 1 ? true : false,
  );

  const handleUpdateContact = async () => {
    const {id} = route.params.contact;
    const updatedFavorite = favorite ? 1 : 0;
    const updatedContact = new Contact(
      id,
      name,
      mobile,
      landline,
      photo,
      updatedFavorite,
    );
    await updateContact(updatedContact);
    navigation.goBack();
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(route.params.contact.id);

      navigation.goBack();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Avatar
          source={
            photo
              ? {uri: photo}
              : {uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
          }
          rounded
          size={50}
          style={styles.avatar}
        />
      </View>
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
        placeholder="Landline"
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
      <TouchableOpacity style={styles.button} onPress={handleUpdateContact}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deletebutton}
        onPress={handleDeleteContact}>
        <Text style={styles.buttonText}>Delete</Text>
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
  imagecontainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f4f4f4',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
  },
  deletebutton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,

    marginBottom: 10,
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

export default UpdateContact;
