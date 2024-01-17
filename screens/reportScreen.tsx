import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';
import {Footer, Header, Report} from '../components';
import firestore from '@react-native-firebase/firestore';
import {useUserContext} from '../context/userContext';
import {useNavigation, useRoute} from '@react-navigation/native';

interface ReportData {
  name: string;
  status?: string;
  id: string;
  url: string;
}

export const ReportScreen: React.FC = () => {
  const {user} = useUserContext();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const eventsSnapshot = await firestore()
        .collection('reports')
        .where('userID', '==', user?.userID)
        .get();
      if (eventsSnapshot.size > 0) {
        eventsSnapshot.forEach(ele => {
          const newReport = ele.data() as ReportData;
          setReportData(prev => [...prev, newReport]);
        });
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  useEffect(() => {
    console.log(reportData);
  }, [reportData]);

  return (
    <>
      <Header name={route.name} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('AddReport');
        }}>
        <View style={styles.button}>
          <Text style={styles.fontSmall}>Add new Report</Text>
        </View>
      </TouchableOpacity>
      {loading && <ActivityIndicator size={100} color={"#9E77ED"} />}
      {!loading && (
        <View style={{padding: 20, gap: 15}}>
          <FlatList
            data={reportData}
            keyExtractor={item => item.name.toString()}
            renderItem={({item}) => <Report url={item.url} name={item.name} />}
          />
        </View>
      )}
      <Footer activeIndex={0} />
    </>
  );
};

const styles = StyleSheet.create({
  fontSmall: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  button: {borderWidth: 1, backgroundColor: '#978CD0', padding: 10},
});
