import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-url-polyfill/auto';
import {
  IVehicle,
  IVehicleAll,
  requestState,
  requsetVehicleState,
} from '../../Api/State';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {readAuthInfo} from '../../RealmDB/Schema';
import HomeScreen from '../Home/HomeScreen';

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.ControlScreen
>;

const ControlScreen = (props: IProps): JSX.Element => {
  const [test, setTest] = useState<IVehicle>();
  const id = useRef<number>();
  console.log(props);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.carName}>123</Text>
        <View>
          <Image
            source={require('../../../assets/image/controlOUT.jpg')}
            style={styles.carInLook}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },

  container: {
    padding: 20,
    flex: 1,
  },

  carName: {
    color: '#CCCCCC',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
  },

  beteryStatus: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
  },

  carStatus: {
    color: '#CCCCCC',
    fontSize: 10,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
  },

  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopRadius: 10, // to provide rounded corners
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

  carInLook: {
    width: '100%',
    height: '100%',
  },
});

export default ControlScreen;
