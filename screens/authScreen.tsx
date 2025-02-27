import React, {useState} from 'react';
import config from './auth.fields.config';
import {Controller, useForm} from 'react-hook-form';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {useUserContext} from '../context/userContext';

interface fieldType {
  name: string;
  secureTextEntry: boolean;
  placeholder: string;
}

export const AuthScreen: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {demoLogin} = useUserContext();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  function handleDemoLogin() {
    setLoading(true);
    demoLogin().then(() => navigate('Home'));
    setLoading(false);
  }

  function handleLogin(data) {
    console.log('called');
    console.log(data);
  }

  const [loading, setLoading] = useState(false);

  const [pageType, setPageType] = useState<string>('');

  const authElement = (
    <View className="max-w-sm bg-secondary flex-1 w-screen p-5 pt-20">
      {pageType && (
        <>
          <View>
            <Text className="text-white uppercase font-poppins text-4xl font-semibold">
              {pageType && config[pageType].pageName}
            </Text>
            <Text className="font-poppins text-slate-800 capitalize font-medium text-[18px] w-60">
              {pageType && config[pageType].caption}
            </Text>
          </View>
          <View className="p-3 px-5 pt-32 items-center">
            <View className="w-full p-0 m-0 rounded-xl">
              <View className="w-full m-0 h-[325px]">
                {pageType &&
                  config[pageType].fields.map(
                    (ele: fieldType, index: number) => (
                      <React.Fragment key={index}>
                        <Controller
                          name={ele.name}
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                              placeholder={ele.placeholder}
                              // eslint-disable-next-line @typescript-eslint/no-shadow
                              onChangeText={value => onChange(value)}
                              onBlur={onBlur}
                              value={value}
                              className={`bg-white border-[1px] ${
                                config[pageType].fields.length === 1
                                  ? 'rounded-xl'
                                  : index === 0
                                  ? 'rounded-t-xl'
                                  : index === config[pageType].fields.length - 1
                                  ? 'rounded-b-xl'
                                  : ''
                              } font-medium font-poppins border-gray-200 m-0 p-3 pl-5 text-[16px] text-blue-950 max-w-sm`}
                            />
                          )}
                        />
                        {errors &&
                          errors[ele.name] &&
                          errors[ele.name]?.message && (
                            <Text>{errors[ele.name]?.message || ''}</Text>
                          )}
                      </React.Fragment>
                    ),
                  )}

                <View className="flex-row w-full m-auto pt-5 gap-3">
                  {/* <Button title="SUBMIT" onPress={handleSubmit(handleLogin)} /> */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(handleLogin)}>
                    <View className="bg-violet-800" style={styles.button}>
                      <Text style={styles.fontSmall}>
                        {config[pageType].primaryBtn.displayText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {pageType && config[pageType].secondaryBtn && (
                  <View className="pt-10">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setPageType(config[pageType].secondaryBtn.pageType);
                      }}>
                      <View className="text-violet-800 items-end whitespace-nowrap grow-0 flex-0 ml-auto hover:border-violet-400 border-b-2">
                        <Text className="hover:text-violet-500 flex-0a hover:border-b-4 duration-500 font-poppins text-xl">
                          {config[pageType].secondaryBtn.displayText}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View>
                <Text />
              </View>
            </View>
          </View>
        </>
      )}

      <View
        style={{zIndex: -1, elevation: -1}}
        className="absolute bg-violet-700 opacity-50 w-[600px] h-[600px] -left-[300px] rounded-full -top-[300px]"
        nativeID="circle"
      />
    </View>
  );

  const buttons = (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setPageType('login');
        }}>
        <View style={styles.button}>
          <Text style={styles.fontSmall}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleDemoLogin();
        }}>
        <View style={styles.button}>
          <Text style={styles.fontSmall}>Demo Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPageType('signup');
        }}>
        <View>
          <Text style={styles.underlinedText}>Not a user? SignUp</Text>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.wrapper}>
      {pageType !== '' ? authElement : buttons}
      {loading && <ActivityIndicator />}
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
  button: {
    borderWidth: 1,
    backgroundColor: '#978CD0',
    padding: 10,
    paddingVertical: 5,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
