import React, {useState} from 'react';
import config from './auth.fields.config';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {useUserContext} from '../../context/userContext';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import ForgetForm from './ForgotForm';
import ResetForm from './ResetForm';

export const AuthScreen: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {demoLogin} = useUserContext();

  function handleDemoLogin() {
    setLoading(true);
    demoLogin().then(() => navigate('Home'));
    setLoading(false);
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
              <View className="w-full m-0">
                {pageType === 'signup' && <SignUpForm />}
                {pageType === 'login' && <LoginForm />}
                {pageType === 'forgot' && <ForgetForm />}
                {pageType === 'reset' && <ResetForm />}
                <View className="flex-0 my-5 border-[0.5px] border-[#8f8f8f]" />
                {pageType && config[pageType].secondaryBtn && (
                  <View className="">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setPageType(config[pageType].secondaryBtn.pageType);
                      }}>
                      <View className="whitespace-nowrap grow-0 flex-0 m-auto hover:border-violet-400 border-b-[1px]">
                        <Text className="focus-within:text-violet-500 text-xs hover:border-b-2 duration-500 text-[#8f8f8f] font-poppins">
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
