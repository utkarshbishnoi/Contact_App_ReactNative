import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ContactList from '../components/ContactList';
import FavoriteContactList from '../components/FavoriteContact';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Contact List"
      screenOptions={{
        statusBarColor: 'grey',
        headerStyle: {
          backgroundColor: 'grey',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Drawer.Screen name="Contact List" component={ContactList} />
      <Drawer.Screen name="Favorite Contacts" component={FavoriteContactList} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
