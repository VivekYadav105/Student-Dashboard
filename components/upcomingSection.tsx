import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface eventData {
  name: string;
  logo: string;
  date: any;
}

export function UpcomingEvents() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<eventData[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const eventsSnapshot = await firestore().collection('events').get();
      if (eventsSnapshot.size > 0) {
        eventsSnapshot.forEach(ele => {
          const eventData = ele.data() as eventData;
          const timeStamp = eventData.date;
          const parsedTimestamp = timeStamp.toDate();
          setEvents(prev => [...prev, {...eventData, date: parsedTimestamp}]);
        });
      }
    };
    fetchEvents();
  }, []);
  return (
    <View nativeID="upcoming-section" style={styles.setcionWrapper}>
      <Text
        style={styles.heading}>{`Upcoming Events (${events?.length})`}</Text>
      {events.map((ele, index) => (
        <View style={styles.wrapper} key={index}>
          <Text style={styles.name}>{ele.name}</Text>
          <View style={{alignItems: 'center', gap: 0}}>
            <Text style={styles.month}>
              {ele?.date.toLocaleString('default', {month: 'short'})}
            </Text>
            <Text style={styles.date}>{ele?.date.getDate()}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  setcionWrapper: {
    gap: 10,
  },
  heading: {
    fontWeight: '500',
    paddingVertical: 15,
    fontSize: 22,
    color: 'black',
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#DCD9EF',
  },
  name: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 20,
  },
  date: {
    fontSize: 32,
    color: 'black',
    padding: 0,
    margin: 0,
    lineHeight: 32,
  },
  month: {
    textTransform: 'uppercase',
    padding: 0,
    margin: 0,
    color: 'black',
  },
});
