import React, {FC, ReactElement, useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';

export const SignupScreen: FC<{}> = ({}): ReactElement => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={'Username'}
        onChangeText={text => setEmail(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title={'Sign Up'} onPress={() => {}} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
