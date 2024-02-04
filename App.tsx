/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './context/userContext';
import './app.d';
import {Router} from './router';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaView>
  );
}

export default App;
