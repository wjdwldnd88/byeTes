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

const beteryStatus = 'beteryStatus';

const HomeScreen = (props: IProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<IVehicle>();
  const [vehicleDataAll, setvehicleDataAll] = useState<IVehicleAll>();
  const Id = useRef<number>(vehicleData?.id as number);
  // 괄호를 빈거로 놔두면 Id 넣는 부분에서 전부 에러 생김
  const onPress_1 = async () => {};

  const onPress = async () => {
    // 이거 requsetVehicleState 도 호출을 못하는거 같음
    await requsetVehicleState(accessToken, Id.current);
    console.log('accessToken : ', accessToken);
    console.log('Id : ', Id);
    console.log(
      'vehicleDataAll?.charge_state : ',
      vehicleDataAll?.charge_state,
    );
    console.log(
      'vehicleDataAll?.charge_state.battery_level : ',
      vehicleDataAll?.charge_state.battery_level,
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
      }
    });
  }, [accessToken]);

  // const Id = vehicleData?.id as number;

  useEffect(() => {
    requsetVehicleState(accessToken, Id.current).then(vehicle_data_all => {
      if (vehicle_data_all) {
        setvehicleDataAll(vehicle_data_all);
        console.log('vehicle_Data_all : ', vehicle_data_all);
      }
      console.log('vehicle_Data_all : ', vehicle_data_all);
    });
  }, [accessToken, Id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{padding: 10, flex: 0.5}}>
        <Text style={styles.carName}>{vehicleData?.display_name}</Text>

        <Text style={styles.beteryStatus}>
          {vehicleDataAll?.charge_state.battery_level}
        </Text>

        <Text style={styles.carStatus}>{vehicleData?.state}</Text>

        <View>
          <Image
            source={require('../../../assets/image/myTesla.jpg')}
            style={styles.image}
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{vehicleData?.id}</Text>
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
