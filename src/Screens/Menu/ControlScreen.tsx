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
} from 'react-native';
import 'react-native-url-polyfill/auto';
import {
  LockDoors,
  unLockDoors,
  unLockFrunk,
  unLockTrunk,
} from '../../Api/Control';
import {IVehicleAll, requsetVehicleState} from '../../Api/State';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {backgroundImage} from '../../Utils/Image';
export interface IControlScreenProps {
  id: number;
  accessToken: string;
  lockStatus: boolean;
}

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.ControlScreen
>;

const ControlScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;
  const {id} = props.route.params as IControlScreenProps;
  const {accessToken} = props.route.params as IControlScreenProps;
  const {lockStatus} = props.route.params as IControlScreenProps;
  const [imageFrontBack, setimageFrontBack] = useState<any>();
  const [imageBodyBack, setimageBodyBack] = useState<any>();
  const [imageRearBack, setimageRearBack] = useState<any>();
  const [vehicleDataAll, setVehicleDataAll] = useState<IVehicleAll>();
  let lockUnlockSwitch = '';

  const switchBackInit = () => {
    if (lockStatus) {
      setimageFrontBack(backgroundImage.controlOutFrunkLock);
      setimageBodyBack(backgroundImage.controlOutBodyLock);
      setimageRearBack(backgroundImage.controlOutTrunkLock);
    } else {
      setimageFrontBack(backgroundImage.controlOutFrunkLock);
      setimageBodyBack(backgroundImage.controlOutBodyUnlock);
      setimageRearBack(backgroundImage.controlOutTrunkLock);
    }
  };

  const lockStatusString = lockStatus.toString();
  const goBack = () => {
    navigation.goBack();
  };

  const alert = () => {
    Alert.alert('asdfafadf', lockStatusString);
  };

  const onPressLockUnlockDoors = async () => {
    const allStates = await requsetVehicleState(accessToken, id);
    setVehicleDataAll(allStates);
    if (allStates?.vehicle_state.locked) {
      console.log('unLockDoors');
      const unLockResult = await unLockDoors(accessToken, id);
      if (unLockResult?.result) {
        setimageBodyBack(backgroundImage.controlOutBodyUnlock);
      }
    } else {
      console.log('LockDoors');
      const LockResult = await LockDoors(accessToken, id);
      if (LockResult?.result) {
        setimageBodyBack(backgroundImage.controlOutBodyLock);
      }
    }
  };

  const onPressUnLockFrunk = () =>
    Alert.alert('계속 하시겠습니까?', '수동으로 닫으셔야 합니다.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const allStates = await requsetVehicleState(accessToken, id);
          if (allStates?.vehicle_state.ft == 0) {
            const unLockFrunkResult = await unLockFrunk(accessToken, id);
            if (unLockFrunkResult?.status == 'success') {
              setimageFrontBack(backgroundImage.controlOutFrunkUnlock);
            }
          }
        },
      },
    ]);

  const onPressUnLockTrunk = () =>
    Alert.alert('계속 하시겠습니까?', '수동으로 닫으셔야 합니다.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const allStates = await requsetVehicleState(accessToken, id);
          if (allStates?.vehicle_state.rt == 0) {
            const unLockTrunkResult = await unLockTrunk(accessToken, id);
            if (unLockTrunkResult?.status == 'success') {
              setimageRearBack(backgroundImage.controlOutTrunkUnlock);
            } else {
              const unLockTrunkResult = await unLockTrunk(accessToken, id);
              if (unLockTrunkResult?.status == 'success') {
                setimageRearBack(backgroundImage.controlOutTrunkLock);
              }
            }
          }
        },
      },
    ]);

  useEffect(() => {
    switchBackInit();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={{flexDirection: 'row'}}>
          <Text style={styles.goBack}>🔙</Text>

          <Text style={styles.menuHeader}> 컨트롤 </Text>

          <Text style={{flex: 1}} />
        </TouchableOpacity>

        <ImageBackground source={imageFrontBack} style={styles.carOutLook}>
          <TouchableOpacity onPress={onPressUnLockFrunk}>
            <Text style={styles.frunkOpen}>123</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={imageBodyBack} style={styles.carOutLook}>
          <TouchableOpacity onPress={onPressLockUnlockDoors}>
            <Text style={styles.carLock}>123</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={imageRearBack} style={styles.carOutLook}>
          <TouchableOpacity onPress={onPressUnLockTrunk}>
            <Text style={styles.TrunkOpen}>123</Text>
          </TouchableOpacity>
        </ImageBackground>
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

  frunkOpen: {
    color: '#00000000',
    fontSize: 30,
    fontWeight: '200',
    marginTop: 43,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
  },

  TrunkOpen: {
    color: '#00000000',
    fontSize: 30,
    fontWeight: '200',
    marginTop: 153,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
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

  carLock: {
    color: '#00000000',
    fontSize: 30,
    fontWeight: '200',
    marginTop: 310,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
  },

  menuHeader: {
    color: '#fff',
    textAlign: 'center',
    padding: 0,
    alignSelf: 'center',
    flex: 1,
  },
  carOutLook: {
    width: '100%',
    flex: 1,
    //height: '33%',
    alignItems: 'center',
  },
});

export default ControlScreen;
