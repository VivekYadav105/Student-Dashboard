import React, {FC, ReactElement} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
// import auth from '@react-native-firebase/auth';

interface formValues {
  email: string;
  password: string;
}

const LoginForm: FC<{}> = ({}): ReactElement => {
  const {handleSubmit, control, setError} = useForm<formValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = async values => {
    const {password, email} = values;
    console.log(values);
  };

  return (
    <>
      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <TextInput
            value={field.value}
            className={`bg-white 
              border-[1px] rounded-t-xl font-medium 
              font-poppins border-gray-200 m-0 p-3 pl-5 
              text-[16px] text-blue-950 max-w-sm`}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            placeholder={'Username'}
            placeholderTextColor={'#6f6f6f'}
            autoCapitalize={'none'}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field}) => (
          <TextInput
            value={field.value}
            className={`bg-white 
            border-[1px] font-medium 
            font-poppins rounded-b-xl border-gray-200 m-0 p-3 pl-5 
            text-[16px] text-blue-950 max-w-sm`}
            placeholder={'Password'}
            secureTextEntry
            placeholderTextColor={'#6f6f6f'}
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
          onPress={handleSubmit(login)}>
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

export default LoginForm;
