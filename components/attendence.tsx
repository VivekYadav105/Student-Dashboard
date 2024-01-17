import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUserContext} from '../context/userContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import firestore from '@react-native-firebase/firestore';

interface AttendenceData {
  class: string;
  userID: String;
  attendenceData: Record<string, string>;
}

export const AttendenceSection: React.FC = () => {
  const {user} = useUserContext();
  const [attendence, setAttendence] = useState<AttendenceData | null>(null);
  const [month, setMonth] = useState<string>('April');
  const [items, setItems] = useState<{label: string; value: string}[]>([]);
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAttendence = async () => {
      setLoading(true);
      const attendenceSnapShot = await firestore()
        .collection('attendence')
        .where('userID', '==', user?.userID)
        .get();
      if (attendenceSnapShot.size > 0) {
        const attendenceData = attendenceSnapShot.docs[0].data() as
          | AttendenceData
          | undefined;
        if (attendenceData && attendenceData.attendenceData) {
          setAttendence(attendenceData);
        }
      }
      setLoading(false);
    };
    fetchAttendence();
  }, [user?.userID]);

  useEffect(() => {
    if (attendence?.attendenceData && loading) {
      setItems([]);
      const months = Object.keys(attendence?.attendenceData);
      months.map(ele => {
        setItems(prev => [
          ...prev,
          {
            label: ele,
            value: ele,
            containerStyle: {
              backgroundColor: '#ffff',
            },
            labelStyle: {
              textAlign: 'center',
              color: '#000',
              fontFamily: 'Poppins-Regular',
            },
          },
        ]);
      });
    }
  }, [attendence]);

  return (
    <View nativeID="attendence-section" style={styles.wrapper}>
      <View>
        <Text style={styles.fontSmall}>Attendence</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexGrow: 0,
            maxWidth: 100,
          }}>
          <View style={{elevation: 20, zIndex: 21}}>
            <DropDownPicker
              listMode="FLATLIST"
              textStyle={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
              }}
              placeholderStyle={{color: 'white', fontFamily: 'Poppins-Regular'}}
              containerStyle={{
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              selectedItemLabelStyle={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                backgroundColor: '#DCD9EF',
              }}
              style={styles.dropDownStyle}
              showTickIcon={false}
              value={month}
              items={items}
              open={expand}
              setOpen={setExpand}
              setValue={setMonth}
              setItems={setItems}
            />
          </View>
        </View>
      </View>
      <View>
        {attendence && (
          <AnimatedCircularProgress
            size={120}
            lineCap="round"
            width={12}
            fill={Number(attendence?.attendenceData[month])}
            duration={500}
            tintColor="#ffffff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#DCD9EF23">
            {() => (
              <Text style={styles.fontSmall}>
                {attendence?.attendenceData[month]}
              </Text>
            )}
          </AnimatedCircularProgress>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#978CD0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
    borderRadius: 30,
  },
  dropDownStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 140,
    alignSelf: 'flex-start',
    elevation: 201,
    zIndex: 200,
    flexGrow:0,
    flexShrink:1,
    padding: 0,
    alignItems: 'center',
  },
  fontSmall: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18,
  },
  fontLarge: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    paddingTop: 10,
    fontSize: 24,
  },
});
