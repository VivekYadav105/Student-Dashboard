import React, {FC, ReactElement} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {err} from 'react-native-svg';
// import auth from '@react-native-firebase/auth';

interface formValues {
  email: string;
  confirmPassword: string;
  password: string;
  error?: string;
}

const SignupScreen: FC<{}> = ({}): ReactElement => {
  const {
    handleSubmit,
    control,
    setError,
    formState: {errors},
  } = useForm<formValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const createUser = async values => {
    const {password, confirmPassword} = values;
    if (password !== confirmPassword) {
      console.log("Password doesn't match");
      setError('error', {
        message: "Passwords doesn't match",
      });
    }
    console.log(values);
  };

  return (
    <>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {message: 'Email is Required', value: true},
          pattern: {
            message: 'Not a valid email',
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          },
        }}
        render={({field}) => (
          <View className="bg-white relative border-[1px] rounded-t-xl border-gray-200 max-w-sm">
            <TextInput
              value={field.value}
              className={` 
                font-medium 
                font-poppins m-0 p-1 pl-5 rounded-t-xl
                text-[16px] text-blue-950 w-full`}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder={'Username'}
              placeholderTextColor={'#6f6f6f'}
              autoCapitalize={'none'}
            />
            {}
            <ErrorMessage
              name="email"
              errors={errors}
              render={({message}) => (
                <Text className="text-red-800 left-5 bottom-2 text-xs">
                  {message}
                </Text>
              )}
            />
          </View>
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
            font-poppins border-gray-200 m-0 p-3 pl-5 
            text-[16px] text-blue-950 max-w-sm`}
            placeholder={'Password'}
            secureTextEntry
            placeholderTextColor={'#6f6f6f'}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({field}) => (
          <TextInput
            className={`bg-white 
            border-[1px] rounded-b-xl font-medium 
            font-poppins border-gray-200 m-0 p-3 pl-5 
            text-[16px] text-blue-950 max-w-sm`}
            value={field.value}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#6f6f6f'}
            secureTextEntry
            onChangeText={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <View className="flex flex-row items-center justify-center w-full bg-red-0 m-auto pt-5 gap-3">
        {/* <Button title="SUBMIT" onPress={handleSubmit(handleLogin)} /> */}
        <TouchableOpacity
          className="w-full bg-[#978CD0] border-[1px] border-black flex items-center"
          activeOpacity={0.8}
          onPress={handleSubmit(createUser)}>
          <View>
            <Text className="text-white text-lg font-semibold py-2 font-poppins">
              Create Account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignupScreen;
