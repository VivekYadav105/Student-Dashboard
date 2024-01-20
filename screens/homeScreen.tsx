import {ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useUserContext} from '../context/userContext';
import {Footer, UpcomingEvents} from '../components';
import {AttendenceSection} from '../components/attendence';
import {Header} from '../components';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useUserContext();
  const route = useRoute();
  return (
    <>
      <Header name={route.name} />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <View>
          <View nativeID="welcome-wrapper" style={{paddingBottom: 20}}>
            <View>
              <Text
                style={{
                  color: 'black',
                  textShadowColor: ' rgba(0,0,0,0.47);',
                  textShadowOffset: {width: 1, height: 1},
                  textShadowRadius: 2,
                  fontFamily: 'Poppins-Regular',
                }}>
                Welcome Back,
              </Text>
              <Text
                style={{
                  color: '#262626',
                  fontSize: 24,
                  fontWeight: '500',
                  fontFamily: 'Poppins-Medium',
                  textShadowColor: ' rgba(0,0,0,0.47);',
                  textShadowOffset: {width: 0.25, height: 0.5},
                  textShadowRadius: 8,
                }}>
                {user?.name}
              </Text>
            </View>
          </View>
          <AttendenceSection />
          <View nativeID="links-section" style={{zIndex: -1}}>
            <Text
              style={{
                fontWeight: '500',
                paddingVertical: 15,
                fontSize: 24,
                zIndex: -1,
                color: 'black',
              }}>
              Quick Links
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#DCD9EF',
                padding: 10,
                borderRadius: 20,
              }}>
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}
                onPress={() => navigation.navigate('Report')}>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 30,
                    borderColor: '#5140B1',
                    backgroundColor: '#978CD0',
                  }}>
                  <Image
                    source={require('../assets/article.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#666666'}}>
                  Report
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 30,
                    borderColor: '#5140B1',
                    backgroundColor: '#978CD0',
                  }}>
                  <Image
                    source={require('../assets/summarize.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#666666'}}>
                  Syllabus
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 30,
                    borderColor: '#5140B1',
                    backgroundColor: '#978CD0',
                  }}>
                  <Image
                    source={require('../assets/square_foot.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#666666'}}>
                  unit test
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 30,
                    borderColor: '#5140B1',
                    backgroundColor: '#978CD0',
                  }}>
                  <Image
                    source={require('../assets/credit_card.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#666666'}}>
                  Payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <UpcomingEvents />
        </View>
      </ScrollView>
      {user && <Footer activeIndex={1} />}
    </>
  );
};
