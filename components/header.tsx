import {useNavigation, NavigationState} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

interface HeaderProps {
  name: String;
}

export const Header: React.FC<HeaderProps> = props => {
  const navigation = useNavigation();

  const homeButton = (
    <TouchableOpacity
      onPress={() => {
        if (props.name !== 'Home') {
          navigation.goBack();
        }
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          marginRight: props.name === 'Home' ? 15 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: props.name === 'Home' ? '#EDEDF1' : 'transparent',
          borderColor: 'black',
          borderRadius: 50,
        }}>
        {props.name === 'Home' ? (
          <Image
            height={20}
            width={20}
            source={require('../assets/menu.png')}
          />
        ) : (
          <Image
            height={20}
            width={20}
            source={require('../assets/arrow_back_ios.png')}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {homeButton}
        {props.name !== 'Home' && (
          <Text style={{color: 'black', fontSize: 20}}>{props.name}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EDEDF1',
            borderColor: 'black',
            borderRadius: 50,
          }}>
          <Image
            height={20}
            width={20}
            source={require('../assets/notifications_unread.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
