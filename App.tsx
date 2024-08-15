/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './context/userContext';
import './app.d';
import {Router} from './router';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {View, Text} from 'react-native';

function App(): React.JSX.Element {
  const [hasNetwork, setHasNetwork] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setHasNetwork(state.isConnected || false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!hasNetwork && (
        <View className="bg-red-500 text-black z-50 w-screen py-2 absolute top-0">
          <Text className="text-black text-sm font-poppins text-center">
            No Network Connection
          </Text>
        </View>
      )}
      <UserProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaView>
  );
}

export default App;
