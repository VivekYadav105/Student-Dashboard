import React from 'react';
import {View, Text} from 'react-native';

interface Chapter {
  finished: number;
  name: String;
}

const Chapter: React.FC<Chapter> = props => {
  return (
    <View>
      <Text>{props.name}</Text>
      <Text>{props.finished}</Text>
    </View>
  );
};

export default Chapter;
