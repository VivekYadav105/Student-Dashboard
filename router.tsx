import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddReport,
  AuthScreen,
  HomeScreen,
  NotificationScreen,
  ProfileScreen,
  ReportScreen,
} from './screens';
import {useUserContext} from './context/userContext';

export const Router = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useUserContext();
  return (
    <>
      {/* <ScrollView style={{backgroundColor: 'white',color:""}}> */}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Group>
              <Stack.Screen name="Report" component={ReportScreen} />
              <Stack.Screen name="AddReport" component={AddReport} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
              />
            </Stack.Group>
          </>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Auth" component={AuthScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
      {/* </ScrollView> */}
    </>
  );
};
