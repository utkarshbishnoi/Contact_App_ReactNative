import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateContact from '../components/UpdateContact';
import CreateNewContact from '../components/CreateNewContact';
import DrawerNavigator from './DrawerNavigator';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: 'grey',
        headerStyle: {
          backgroundColor: 'grey',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateContact"
        component={CreateNewContact}
        options={{title: 'Add new contact'}}
      />
      <Stack.Screen
        name="UpdateContact"
        component={UpdateContact}
        options={{title: 'Update contact'}}
      />
    </Stack.Navigator>
  );
}
