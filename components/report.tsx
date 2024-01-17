import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/firestore';

interface ReportProps {
  url: string;
  name: string;
  status?: string;
}

export const Report: React.FC<ReportProps> = props => {
  async function handleDownload() {
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/description.png')} />
      </View>
      <View style={{flexDirection: 'row', flexGrow: 1, paddingLeft: 10}}>
        <Text style={{color: 'black', fontSize: 20}}>{props.name}</Text>
      </View>
      <View>
        {props.status && (
          <Text style={{color: 'black', fontWeight: '500', fontSize: 20}}>
            {props.status}%
          </Text>
        )}
        {!props.status && (
          <TouchableOpacity
            onPress={() => {
              handleDownload();
            }}
            style={{borderWidth: 1, padding: 10}}>
            <Image source={require('../assets/cloud_download.png')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#9E77ED',
    padding: 10,
    paddingHorizontal: 20,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#5140B1',
    backgroundColor: '#978CD0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
