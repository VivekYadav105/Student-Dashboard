import React from 'react';
import {
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
export const Footer: React.FC<{
  activeIndex: number;
}> = props => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View
      style={[
        styles.wrapper,
        {
          width: width,
        },
      ]}>
      <View
        style={[
          {
            width: width - 40,
            height: 70,
            borderRadius: 20,
            backgroundColor: 'white',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <View
            style={[
              styles.buttonView,
              {
                backgroundColor:
                  route.name === 'Home' ? '#978CD0' : 'transparent',
              },
            ]}>
            <Image source={require('../assets/home.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Report');
          }}>
          <View
            style={[
              styles.buttonView,
              {
                backgroundColor:
                  route.name === 'Report' ? '#978CD0' : 'transparent',
              },
            ]}>
            <Image source={require('../assets/calendar_today.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View
            style={[
              styles.buttonView,
              {
                backgroundColor:
                  route.name === 'Profile' ? '#978CD0' : 'transparent',
              },
            ]}>
            <Image source={require('../assets/account_box.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    width: 45,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    maxWidth: 400,
    position: 'absolute',
    bottom: 25,
    height: 60,
  },
});
