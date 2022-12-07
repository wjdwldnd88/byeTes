import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Switch,
} from 'react-native';
import 'react-native-url-polyfill/auto';
import {
  autoConditionStart,
  autoConditionStop,
  setPreconditioningMax,
  setSeatHeater,
  setTemperature,
} from '../../Api/Climate';
import {climate_state, IVehicleAll, requsetVehicleState} from '../../Api/State';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {backgroundImageClimate} from '../../Utils/Image';
export interface IClimateScreenProps {
  id: number;
  accessToken: string;
}

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.ClimateScreen
>;

const ClimateScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;
  const {id} = props.route.params as IClimateScreenProps;
  const {accessToken} = props.route.params as IClimateScreenProps;
  const [imageClimateBack, setimageClimateBack] = useState<any>();
  const [imageHeatLeft, setimageHeatLeft] = useState<any>();
  const [imageHeatRight, setimageHeatRight] = useState<any>();
  const [imageHeatRearLeft, setimageHeatRearLeft] = useState<any>();
  const [imageHeatRearCenter, setimageHeatRearCenter] = useState<any>();
  const [imageHeatRearRight, setimageHeatRearRight] = useState<any>();
  const [vehicleDataAll, setVehicleDataAll] = useState<IVehicleAll>();
  const [climateState, setClimateState] = useState<climate_state>();
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempSetting, setTempSetting] = useState<Number>();
  const [toLevel, setToLevel] = useState<Number>();
  const [heatPos, setHeatPos] = useState<string>();

  const goBack = () => {
    navigation.goBack();
  };

  const climateStateInit = async () => {
    const allState = await requsetVehicleState(accessToken, id);
    setClimateState(allState?.climate_state);
    setTempSetting(allState?.climate_state.driver_temp_setting);
    console.log(allState?.climate_state);

    if (allState?.climate_state.is_auto_conditioning_on == true) {
      setimageClimateBack(backgroundImageClimate.climateHeat);
      setIsEnabled(true);
    } else {
      setimageClimateBack(backgroundImageClimate.climate);
      setIsEnabled(false);
    }

    seatHeaterLeft(allState?.climate_state.seat_heater_left as number);
    seatHeaterRight(allState?.climate_state.seat_heater_right as number);
    seatHeaterRearLeft(allState?.climate_state.seat_heater_rear_left as number);
    seatHeaterRearCenter(
      allState?.climate_state.seat_heater_rear_center as number,
    );
    seatHeaterRearRight(
      allState?.climate_state.seat_heater_rear_right as number,
    );
  };

  const seatHeaterLeft = (number: number) => {
    switch (number) {
      case 0:
        return setimageHeatLeft(backgroundImageClimate.climateHeat0);
      case 1:
        return setimageHeatLeft(backgroundImageClimate.climateHeat1);
      case 2:
        return setimageHeatLeft(backgroundImageClimate.climateHeat2);
      case 3:
        return setimageHeatLeft(backgroundImageClimate.climateHeat3);
    }
  };

  const seatHeaterRight = (number: number) => {
    switch (number) {
      case 0:
        return setimageHeatRight(backgroundImageClimate.climateHeat0);
      case 1:
        return setimageHeatRight(backgroundImageClimate.climateHeat1);
      case 2:
        return setimageHeatRight(backgroundImageClimate.climateHeat2);
      case 3:
        return setimageHeatRight(backgroundImageClimate.climateHeat3);
    }
  };

  const seatHeaterRearLeft = (number: number) => {
    switch (number) {
      case 0:
        return setimageHeatRearLeft(backgroundImageClimate.climateHeat0);
      case 1:
        return setimageHeatRearLeft(backgroundImageClimate.climateHeat1);
      case 2:
        return setimageHeatRearLeft(backgroundImageClimate.climateHeat2);
      case 3:
        return setimageHeatRearLeft(backgroundImageClimate.climateHeat3);
    }
  };

  const seatHeaterRearCenter = (number: number) => {
    switch (number) {
      case 0:
        return setimageHeatRearCenter(backgroundImageClimate.climateHeat0);
      case 1:
        return setimageHeatRearCenter(backgroundImageClimate.climateHeat1);
      case 2:
        return setimageHeatRearCenter(backgroundImageClimate.climateHeat2);
      case 3:
        return setimageHeatRearCenter(backgroundImageClimate.climateHeat3);
    }
  };

  const seatHeaterRearRight = (number: number) => {
    switch (number) {
      case 0:
        return setimageHeatRearRight(backgroundImageClimate.climateHeat0);
      case 1:
        return setimageHeatRearRight(backgroundImageClimate.climateHeat1);
      case 2:
        return setimageHeatRearRight(backgroundImageClimate.climateHeat2);
      case 3:
        return setimageHeatRearRight(backgroundImageClimate.climateHeat3);
    }
  };

  const toggleSwitch = async () => {
    if (isEnabled == true) {
      const turnOff = await autoConditionStop(accessToken, id);
    } else {
      const turnOn = await autoConditionStart(accessToken, id);
    }

    setTimeout(async () => {
      await climateStateInit();
    }, 2000);
  };

  const levelSet = async (heater: number) => {
    const allState = await requsetVehicleState(accessToken, id);
    switch (heater) {
      case 0:
        return (
          setToLevel(allState?.climate_state.seat_heater_left),
          setHeatPos('front_left_seat')
        );

      case 1:
        return (
          setToLevel(allState?.climate_state.seat_heater_right),
          setHeatPos('front_right_seat')
        );
      case 2:
        return (
          setToLevel(allState?.climate_state.seat_heater_rear_left),
          setHeatPos('rear_left_seat')
        );
      case 4:
        return (
          setToLevel(allState?.climate_state.seat_heater_rear_center),
          setHeatPos('rear_middle_seat')
        );
      case 5:
        return (
          setToLevel(allState?.climate_state.seat_heater_rear_right),
          setHeatPos('rear_right_seat')
        );
    }
  };

  const heater = async (heater: number) => {
    const preset = await levelSet(heater);
    if ((toLevel as number) == 3) {
      setToLevel(0);
    } else {
      setToLevel((toLevel as number) + 1);
    }
    const heat = await setSeatHeater(
      accessToken,
      id,
      heatPos as string,
      toLevel as number,
    );
    if (heat?.status == 'success') {
      switch (heater) {
        case 0:
          return seatHeaterLeft(toLevel as number);
        case 1:
          return seatHeaterRight(toLevel as number);
        case 2:
          return seatHeaterRearLeft(toLevel as number);
        case 4:
          return seatHeaterRearCenter(toLevel as number);
        case 5:
          return seatHeaterRearRight(toLevel as number);
      }
    }
  };

  const onPressUp = async () => {
    setTempSetting((tempSetting as number) + 1);
    setTemp;
  };

  const onPressDown = async () => {
    setTempSetting((tempSetting as number) - 1);
  };

  const setTemp = async (tempSetting: number) => {
    const tempSet = await setTemperature(accessToken, tempSetting as number);

    if (tempSet?.status == 'success') {
      await autoConditionStart(accessToken, id);
      setTimeout(async () => {
        await climateStateInit();
      }, 2000);
    }
  };

  const afterBlow = () =>
    Alert.alert('에프터블로우 모드', '5분 가동 후 자동으로 종료합니다.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          // const blowStart = await setPreconditioningMax(accessToken, id, true);
          // if (blowStart == true) {
          await autoConditionStart(accessToken, id);
          setTimeout(async () => {
            await climateStateInit();
          }, 2000);
          //  }
          setTimeout(async () => {
            const blowStop = await setPreconditioningMax(
              accessToken,
              id,
              false,
            );
            //   if (blowStop == true) {
            await autoConditionStop(accessToken, id);
            setTimeout(async () => {
              await climateStateInit();
            }, 2000);
            //    }
          }, 2000);
        },
      },
    ]);

  useEffect(() => {
    climateStateInit();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={{flexDirection: 'row'}}>
          <Text style={styles.goBack}>🔙</Text>

          <Text style={styles.menuHeader}> 실내 온도 </Text>

          <Text style={{flex: 1}} />
        </TouchableOpacity>

        <ImageBackground source={imageClimateBack} style={styles.carOutLook}>
          <TouchableOpacity onPress={() => heater(0)}>
            <Image source={imageHeatLeft} style={styles.left} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => heater(1)}>
            <Image source={imageHeatRight} style={styles.right} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => heater(2)}>
            <Image source={imageHeatRearLeft} style={styles.rearLeft} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => heater(4)}>
            <Image source={imageHeatRearCenter} style={styles.rearCenter} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => heater(5)}>
            <Image source={imageHeatRearRight} style={styles.rearRight} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.climateNow}>
          <Text style={styles.climateNowText}>
            실외 : {climateState?.outside_temp}
          </Text>
          <Text style={styles.climateNowText}>
            실내 : {climateState?.inside_temp}
          </Text>
        </View>
        <View style={styles.menuList}>
          <View style={styles.switch}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressDown}>
            <Text>⬇️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.abButton}
            onPress={() => setTemp(tempSetting as number)}>
            <Text style={{fontSize: 30}}>{tempSetting as number}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressUp}>
            <Text>⬆️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.abButton} onPress={afterBlow}>
            <Text style={{fontSize: 20}}>A/B</Text>
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
    padding: 20,
    flex: 1,
  },

  goBack: {
    color: 'black',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
    flex: 1,
  },
  climateNow: {
    backgroundColor: '#00000000',
    color: '#00000000',
    flexDirection: 'row',
    top: -15,
    left: 0,
    right: 0,
  },

  climateNowText: {
    backgroundColor: '#00000000',
    color: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 5,
    flex: 1,
  },

  menuList: {
    backgroundColor: '#00000000',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  switch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    flex: 1,
  },

  button: {
    backgroundColor: '#00000000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 5,
    flex: 1,
  },

  abButton: {
    backgroundColor: '#999999',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 5,
    flex: 1,
  },

  tempSetting: {
    backgroundColor: '#DDDDDD',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 5,
    flex: 1,
  },

  carOutLook: {
    // marginVertical: 10,
    width: '100%',
    flex: 1,
  },

  menuHeader: {
    color: '#fff',
    textAlign: 'center',
    padding: 0,
    alignSelf: 'center',
    flex: 1,
  },

  left: {
    color: '#00000000',
    width: 30,
    height: 23,
    padding: 0,
    left: 95,
    top: 180,
  },

  right: {
    color: '#00000000',
    width: 30,
    height: 23,
    padding: 0,
    left: 225,
    top: 156,
  },

  rearLeft: {
    color: '#00000000',
    width: 30,
    height: 23,
    padding: 0,
    left: 100,
    top: 290,
  },

  rearCenter: {
    color: '#00000000',
    width: 30,
    height: 23,
    padding: 0,
    left: 157,
    top: 267,
  },

  rearRight: {
    color: '#00000000',
    width: 30,
    height: 23,
    padding: 0,
    left: 217,
    top: 244,
  },
});

export default ClimateScreen;
