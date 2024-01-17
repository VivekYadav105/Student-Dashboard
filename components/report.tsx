import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {err} from 'react-native-svg';
import RNFetchBlob from 'rn-fetch-blob';

interface ReportProps {
  url: string;
  name: string;
  status?: string;
}

export const Report: React.FC<ReportProps> = props => {
  const {width} = useWindowDimensions();
  const [status, setStatus] = useState();
  async function handleDownload() {
    try {
      console.log("called")
      console.log(props.url)
      const res = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', props.url);
      const data = await res.path();
      console.log('file saved to', data);
      // eslint-disable-next-line no-catch-shadow
    } catch (err) {
      console.log(err);
    }
  }
  function handleFileView() {}
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={[styles.viewButton, {width: width - 150}]}>
        <View style={styles.imageWrapper}>
          <Image source={require('../assets/description.png')} />
        </View>
        <View style={{flexDirection: 'row', flexGrow: 1, paddingLeft: 10}}>
          <Text style={{color: 'black', fontSize: 20}}>{props.name}</Text>
        </View>
      </TouchableOpacity>
      <View>
        {props.status && (
          <Text style={{color: 'black', fontWeight: '500', fontSize: 20}}>
            {props.status}%
          </Text>
        )}
        {!props.status && (
          <View style={{flexDirection: 'row', gap: 5, padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                handleDownload();
              }}>
              <Image source={require('../assets/cloud_download.png')} />
            </TouchableOpacity>
          </View>
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
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 200,
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
