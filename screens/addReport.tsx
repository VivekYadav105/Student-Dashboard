import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Header} from '../components';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {request, PERMISSIONS} from 'react-native-permissions';

export const AddReport: React.FC = () => {
  const route = useRoute();
  const [reports, setReports] = useState<DocumentPickerResponse[]>([]);
  const fsCloud = storage();
  const bucketUrl = 'gs://tensor-blue-student-dash.appspot.com';

  async function UploadFiles() {
    try {
      if (reports.length === 0) {
        return alert('No file selected to upload');
      }
      const uploadPromises = reports.map(async ele => {
        const fileRef = fsCloud.ref(`${bucketUrl}uploads/${ele.name}`);
        console.log(fileRef);
        const res = fileRef.putFile(ele.uri);

        res.on('state_changed', snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        });
        const results = await Promise.all(uploadPromises);
        console.log(results);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function selectFiles() {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
      });
      setReports(response);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  return (
    <>
      <Header name={route.name} />
      <View style={styles.wrapper}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => selectFiles()}>
            <View style={styles.button}>
              <Text style={styles.fontSmall}>Select Files</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => UploadFiles()}>
            <View style={styles.button}>
              <Text style={styles.fontSmall}>UploadFiles</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View nativeID="selectedFiles" style={styles.heading}>
          <Text style={[styles.fontSmall, {color: 'black'}]}>
            Selected Files
          </Text>
        </View>
        <View
          nativeID="selectedFilesWrapper"
          style={{alignItems: 'center', gap: 2, paddingTop: 10}}>
          {reports?.length == 0 && (
            <Text
              style={[styles.fontSmall, {color: 'black', textAlign: 'center'}]}>
              No files selected
            </Text>
          )}
          {reports.map((ele, index) => (
            <View key={index} style={styles.report}>
              <Text style={[styles.fontSmall, {color: '#978CD0'}]}>
                {ele?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setReports(prev =>
                    prev.filter((ele, indexele) => index !== indexele),
                  );
                }}>
                <View>
                  <Image
                    source={require('../assets/close.png')}
                    style={{width: 20, height: 20}}
                    width={20}
                    height={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  underlinedText: {
    fontFamily: 'Poppins-Regular',
    color: '#978CD0',
    fontSize: 18,
    textDecorationStyle: 'solid',
  },
  heading: {
    backgroundColor: '#978cd0',
    alignItems: 'center',
    padding: 10,
  },
  fontSmall: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  button: {borderWidth: 1, backgroundColor: '#978CD0', padding: 10},
  wrapper: {
    flex: 1,
    gap: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 10,
    justifyContent: 'center',
  },
  report: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    gap: 10,
  },
});
