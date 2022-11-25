import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
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
import {
  IVehicle,
  requestState,
  requsetVehicleState,
  IVehicleAll,
} from '../../Api/State';

type IProps = NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen>;

const HomeScreen = (props: IProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<IVehicle>();
  const [vehicleDataAll, setvehicleDataAll] = useState<IVehicleAll>();

  const id = useRef<number>();

  const handleControlButton = async () => {
    await requestState(accessToken);
    console.log('pressControl  requestState  : ', vehicleData?.id);
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
    readAuthInfo().then(authData => {
      setAccessToken(authData?.access_token || '');
    });
  }, []);
  useEffect(() => {
    requestState(accessToken).then(vehicle_Data => {
      if (vehicle_Data) {
        setVehicleData(vehicle_Data);
        id.current = vehicleData?.id as number;
      }
    });
  }, [accessToken]);

  useEffect(() => {
    if (!id.current) {
      return;
    }

    requsetVehicleState(accessToken, id.current).then(vehicle_data_all => {
      if (!vehicle_data_all) {
        return;
      }

      setvehicleDataAll(vehicle_data_all);
      console.log('111vehicle_Data_all : ', vehicle_data_all);
    });
  }, [accessToken, id.current]);

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
            style={styles.image}
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>{vehicleData?.id}</Text>
          </TouchableOpacity>

          <Text>Access code : </Text>

          <Text>{accessToken}</Text>

          <TouchableOpacity style={styles.button1} onPress={handleControlButton}>
            <Text>컨트롤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>내부온도</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pressButton}>
            <Text>제로백</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pressButton}>
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

  image: {
    width: '100%',
    height: 230,
  },
});

export default HomeScreen;
