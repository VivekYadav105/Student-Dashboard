import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useUserContext} from '../context/userContext';
import {useRoute} from '@react-navigation/native';
import {Header, Footer} from '../components';

export const ProfileScreen: React.FC = () => {
  const {user} = useUserContext();
  const route = useRoute();
  return (
    <>
      <Header name={route.name} />
      <View style={styles.wrapper}>
        <View
          nativeID="profile-header"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 25,
            marginBottom: 10,
          }}>
          <View nativeID="profile-name" style={{marginBottom: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                fontWeight: '500',
                letterSpacing: 0.5,
              }}>
              {user?.name}
            </Text>
          </View>
          <View>
            <Image
              source={require('../assets/avatar.png')}
              style={{width: 60, height: 60}}
            />
          </View>
        </View>
        <View
          nativeID="profile-details"
          style={{
            padding: 25,
            backgroundColor: '#D9DEEF',
            gap: 20,
            borderRadius: 30,
          }}>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>StudentID</Text>
            <Text style={styles.fontStyle}>{user?.studentId}</Text>
          </View>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>Class/Grade</Text>
            <Text style={styles.fontStyle}>{user?.class}</Text>
          </View>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>Contact Number</Text>
            <Text style={styles.fontStyle}>{user?.contact}</Text>
          </View>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>Email Address</Text>
            <Text style={styles.fontStyle}>{user?.email}</Text>
          </View>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>Parent/Guardian</Text>
            <Text style={styles.fontStyle}>{user?.parent}</Text>
          </View>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>Parent Contact</Text>
            <Text style={styles.fontStyle}>{user?.parentContact}</Text>
          </View>
          <View style={styles.fontWrapper}>
            <Text style={styles.fontStyle}>Address</Text>
            <Text style={styles.fontStyle}>{user?.address}</Text>
          </View>
        </View>
      </View>
      {user && <Footer activeIndex={1} />}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 10},
  fontStyle: {fontSize: 13, fontFamily: 'Poppins-Regular', color: '#666666'},
  fontWrapper: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
  },
});
