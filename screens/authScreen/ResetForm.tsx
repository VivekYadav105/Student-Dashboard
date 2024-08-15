import React, {FC, ReactElement} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
// import auth from '@react-native-firebase/auth';

interface formValues {
  email: string;
  password: string;
}

const ResetScreen: FC<{}> = ({}): ReactElement => {
  const {handleSubmit, control} = useForm<formValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginUser = async values => {
    console.log(values);
  };

  return (
    <>
      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            placeholder={'Username'}
            autoCapitalize={'none'}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field}) => (
          <TextInput
            style={styles.input}
            value={field.value}
            placeholder={'Password'}
            secureTextEntry
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />
      <Button title={'Reset Password'} onPress={handleSubmit(loginUser)} />
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

export default ResetScreen;
