import React, {FC, ReactElement} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
// import auth from '@react-native-firebase/auth';

interface formValues {
  email: string | undefined;
  mobileNo: string | undefined;
}

const ForgotScreen: FC<{}> = ({}): ReactElement => {
  const {handleSubmit, control} = useForm<formValues>({
    defaultValues: {
      email: '',
      mobileNo: '',
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
        name="mobileNo"
        control={control}
        render={({field}) => (
          <TextInput
            style={styles.input}
            value={field.value}
            placeholder={'Password'}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />
      <View className="flex flex-row items-center justify-center w-full bg-red-0 m-auto pt-5 gap-3">
        {/* <Button title="SUBMIT" onPress={handleSubmit(handleLogin)} /> */}
        <TouchableOpacity
          className="w-full bg-[#978CD0] border-[1px] border-black flex items-center"
          activeOpacity={0.8}
          onPress={handleSubmit(loginUser)}>
          <View>
            <Text className="text-white text-lg font-semibold py-2 font-poppins">
              Log in
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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

export default ForgotScreen;
