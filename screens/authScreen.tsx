import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../context/userContext';

export const AuthScreen: React.FC = () => {
  const navigation = useNavigation();
  const {demoLogin} = useUserContext();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          alert('hello');
        }}>
        <View style={styles.button}>
          <Text style={styles.fontSmall}>Login with Google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          demoLogin();
        }}>
        <View style={styles.button}>
          <Text style={styles.fontSmall}>Demo Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <View>
          <Text style={styles.underlinedText}>Not a user? SignUp</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  underlinedText: {
    fontFamily: 'Poppins-Regular',
    color: '#978CD0',
    fontSize: 18,
    textDecorationStyle: 'solid',
  },
  fontSmall: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  button: {borderWidth: 1, backgroundColor: '#978CD0', padding: 10},
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
