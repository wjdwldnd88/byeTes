import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { LockDoors, WakeUpVehicle } from '../../Api/Control';
import { transferTokenToPrivateServer } from '../../Api/PrivateServerApi';
import {
  IVehicle,
  IVehicleAll,
  requestState,
  requsetVehicleState
} from '../../Api/State';
import { RootStackParamList, RouteNames } from '../../Navigators/RouteNames';
import { readAuthInfo } from '../../RealmDB/Schema';
import { styles } from './HomeScreen.style';

type IProps = NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen>;

const HomeScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;
  const [accessToken, setAccessToken] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<IVehicle>();
  const [vehicleDataAll, setVehicleDataAll] = useState<IVehicleAll>();
  const [privateServerState, setPrivateServerState] = useState(false);

  const id = useRef<number>();
  const locked = useRef<boolean>();

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

  const navigateToControlScreen = () => {
    if (!vehicleData?.id || !accessToken) {
      return;
    }

    navigation.navigate(RouteNames.ControlScreen, {
      id: vehicleData.id,
      accessToken: accessToken,
      lockStatus: vehicleDataAll?.vehicle_state.locked as boolean,
    });
  };

  const navigateToClimateScreen = () => {
    if (!vehicleData?.id || !accessToken) {
      return;
    }
    navigation.navigate(RouteNames.ClimateScreen, {
      id: vehicleData.id,
      accessToken: accessToken,
    });
  };

  const navigateToStatisticsScreen = () => {
    if (!vehicleData?.id) {
      return;
    }

    navigation.navigate(RouteNames.StatisticsScreen, {id: vehicleData.id});
  };

  const navigateToZeroHundredScreen = () => {
    if (!vehicleData?.id) {
      return;
    }

    navigation.navigate(RouteNames.ZeroHundredScreen, {
      id: vehicleData.id,
      accessToken: accessToken,
    });
  };

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

        const serverState = await transferTokenToPrivateServer(
          accessToken,
          state!.id,
        );

        setPrivateServerState(serverState);
      } catch (e) {
        console.log('network error:', e);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.carName}>{vehicleData?.display_name}</Text>

            <Text style={styles.beteryStatus}>
              베터리 잔여랑 : {vehicleDataAll?.charge_state.battery_level}%
            </Text>

            <Text style={styles.carStatus}>{vehicleData?.state}</Text>
          </View>

          <View>
            <Text style={styles.carName}> Server</Text>

            <View
              style={[
                styles.serverStatusButton,
                privateServerState
                  ? styles.backgroundGreen
                  : styles.backgroundRed,
              ]}>
              <Text style={[styles.beteryStatus]}>
                {privateServerState ? 'on' : 'off'}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Image
            source={require('../../../assets/image/myTesla.jpg')}
            style={styles.carOutLook}
          />
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.button}
            onPress={navigateToControlScreen}>
            <Text>컨트롤</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={navigateToClimateScreen}>
            <Text>내부온도</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={navigateToZeroHundredScreen}>
            <Text>제로백</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={navigateToStatisticsScreen}>
            <Text>베터리통계</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
