import React from 'react';
import {Text, View} from 'react-native';

interface NotificationProps {
  message: string;
  isSeen: boolean;
  timestamp: string;
}

export const Notification: React.FC<NotificationProps> = props => {
  const circle = (
    <View
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: 7.5,
        height: 7.5,
        borderRadius: 10,
        backgroundColor: '#5140B1',
      }}
    />
  );
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 10,
        paddingBottom: 30,
        borderRadius: 20,
        backgroundColor: '#DCD9EF',
      }}>
      {props.isSeen && circle}
      <Text
        style={{
          color: props.isSeen === true ? '#666666' : 'black',
          fontSize: 15,
        }}>
        {props.message}
      </Text>
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          color: '#666666',
          fontSize: 10,
          textTransform: 'uppercase',
        }}>
        {props.timestamp}
      </Text>
    </View>
  );
};
