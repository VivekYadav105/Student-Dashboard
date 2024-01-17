import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {Header, Notification} from '../components';
import firestore from '@react-native-firebase/firestore';
import {useUserContext} from '../context/userContext';
import {useRoute} from '@react-navigation/native';

interface NotificationProps {
  message: string;
  isSeen: boolean;
  timestamp: any;
}

export const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = useUserContext();
  const route = useRoute();

  function parseTimeStamp(timeStamp) {
    const hours = timeStamp.getHours();
    const minutes = timeStamp.getMinutes();
    if (hours > 11) {
      return `${hours - 12}:${minutes} 'PM'`;
    }
    return `${hours}:${minutes} 'AM'`;
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const NotificationSnapShot = await firestore()
          .collection('notifications')
          .where('userID', '==', user?.userID)
          .get();
        if (NotificationSnapShot.size > 0) {
          NotificationSnapShot.forEach(ele => {
            const newNotification = ele.data() as NotificationProps;
            const timeStamp = newNotification.timestamp;
            const parsedTimestamp = parseTimeStamp(timeStamp.toDate());
            console.log(newNotification);
            setNotifications(prev => [
              ...prev,
              {...newNotification, timestamp: parsedTimestamp},
            ]);
          });
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, [user?.userID]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <>
      <Header name={route.name} />
      <View style={{padding: 20, gap: 10}}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.timestamp.toString()}
          renderItem={({item}) => (
            <Notification
              message={item.message}
              timestamp={item.timestamp}
              isSeen={item.isSeen}
            />
          )}
        />
      </View>
    </>
  );
};
