import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import 'react-native-url-polyfill/auto';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {readAuthInfo} from '../../RealmDB/Schema';
import {requestState} from '../../Api/State';

type IProps = NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen>;

const carName = 'carName';
const carStatus = 'carStatus';
const beteryStatus = 'beteryStatus';

const HomeScreen = (props: IProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>('');

  const onPress_1 = async () => {
    const state = await requestState(accessToken);
  };

  const onPress = async () => {
    const state = await requestState(accessToken);
  };
  useEffect(() => {
    readAuthInfo().then(authData => {
      setAccessToken(authData?.access_token || '');
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{padding: 10, flex: 0.5}}>
        <Text style={styles.carName}>{carName}</Text>

        <Text style={styles.beteryStatus}>{beteryStatus}</Text>

        <Text style={styles.carStatus}>{carStatus}</Text>

        <View>
          <Image
            source={require('../../../assets/image/myTesla.jpg')}
            style={styles.image}
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={onPress_1}>
            <Text>컨트롤</Text>
          </TouchableOpacity>

          <Text>Access code : </Text>

          <Text>{accessToken}</Text>

          <TouchableOpacity style={styles.button1} onPress={onPress}>
            <Text>컨트롤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>내부온도</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>제로백</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>베터리통계</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  carName: {
    color: '#CCCCCC',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
    // backgroundColor: '#CC0000',
  },
  beteryStatus: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
    // backgroundColor: '#CC0000',
  },
  carStatus: {
    color: '#CCCCCC',
    fontSize: 10,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
    // backgroundColor: '#CC0000',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  text1: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  button1: {
    elevation: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  image: {
    width: '100%',
    height: 230,
  },
});

export default HomeScreen;
