import React from 'react';
import {Text, View} from 'react-native';
import {ChapterSection} from '../components/chaptersSection';
import {SyllabusHeader} from '../components/syllabusHeader';

export const SyllabusScreen: React.FC = () => {
  return (
    <View nativeID="syllabus-screen">
      <Text>Syllabus screen</Text>
      <SyllabusHeader />
      <ChapterSection />
    </View>
  );
};
