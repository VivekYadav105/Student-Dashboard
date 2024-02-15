import React from 'react';
import {View, Text} from 'react-native';
import Chapter from './chapter';

export const ChapterSection: React.FC = () => {
  return (
    <View>
      <Text>Chapter Section</Text>
      <Chapter name="chapter-1" finished={57} />
    </View>
  );
};
