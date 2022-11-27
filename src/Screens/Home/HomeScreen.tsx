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
import {LockDoors, WakeUpVehicle} from '../../Api/Control';
import {
  IVehicle,
  IVehicleAll,
  requestState,
  requsetVehicleState,
} from '../../Api/State';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {readAuthInfo} from '../../RealmDB/Schema';

type IProps = NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen>;

const HomeScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;
  const [accessToken, setAccessToken] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<IVehicle>();
  const [vehicleDataAll, setVehicleDataAll] = useState<IVehicleAll>();

  const id = useRef<number>();

  const NavigateControl = async () => [
    navigation.navigate(RouteNames.ControlScreen),
  ];

  const handleControlButton = async () => {
    if (!vehicleData?.id) {
      console.log('vehicleData?.id : ', vehicleData?.id);
      return;
    }
    await LockDoors(accessToken, vehicleData?.id);
    console.log('accessToken : ', accessToken);
    console.log('id : ', vehicleData?.id);
  };

  const pressButton = async () => {
    if (!id.current) {
      return;
    }

    await requsetVehicleState(accessToken, id.current);
    console.log('accessToken : ', accessToken);
    console.log('id : ', id.current);
    console.log(
      'vehicleDataAll?.charge_state : ',
      vehicleDataAll?.charge_state,
    );
    console.log(
      'vehicleDataAll?.charge_state.battery_level : ',
      vehicleDataAll?.charge_state.battery_level,
    );
    console.log(
      'vehicleDataAll?.display_name) : ',
      vehicleDataAll?.display_name,
    );
  };

  useEffect(() => {
    readAuthInfo().then(async authData => {
      try {
        const accessToken = authData!.access_token;

        setAccessToken(accessToken);

        const state = await requestState(accessToken);

        setVehicleData(state);
        // wake_up 추가
        if (state?.state == 'asleep') {
          const wakeUp = await WakeUpVehicle(accessToken, state!.id);
        }

        const allStates = await requsetVehicleState(accessToken, state!.id);

        setVehicleDataAll(allStates);
      } catch (e) {
        console.log('network error:', e);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.carName}>{vehicleData?.display_name}</Text>

        <Text style={styles.beteryStatus}>
          베터리 잔여랑 : {vehicleDataAll?.charge_state.battery_level}%
        </Text>

        <Text style={styles.carStatus}>{vehicleData?.state}</Text>

        <View>
          <Image
            source={require('../../../assets/image/myTesla.jpg')}
            style={styles.carOutLook}
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>{vehicleData?.id}</Text>
          </TouchableOpacity>

          <Text>Access code : </Text>

          <Text>{accessToken}</Text>

          <TouchableOpacity style={styles.button1} onPress={NavigateControl}>
            <Text>컨트롤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>내부온도</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>제로백</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleControlButton}>
            <Text>베터리통계</Text>
          </TouchableOpacity>
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
    padding: 10,
    flex: 0.5,
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

  carOutLook: {
    width: '100%',
    height: 220,
  },
});

export default HomeScreen;
