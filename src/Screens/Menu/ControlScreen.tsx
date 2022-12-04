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
  const [imageBack, setimageBack] = useState<any>();
  const [vehicleDataAll, setVehicleDataAll] = useState<IVehicleAll>();
  let lockUnlockSwitch = '';

  const switchBackInit = () => {
    if (lockStatus) {
      setimageBack(backgroundImage.controlOUT);
    } else {
      setimageBack(backgroundImage.controlOutUnlock);
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
        setimageBack(backgroundImage.controlOutUnlock);
      }
    } else {
      console.log('LockDoors');
      const LockResult = await LockDoors(accessToken, id);
      if (LockResult?.result) {
        setimageBack(backgroundImage.controlOUT);
      }
    }
  };

  const onPressUnLockFrunk = async () => {
    const unLockFrunkResult = await unLockFrunk(accessToken, id);
    if (unLockFrunkResult?.result) {
      setimageBack(backgroundImage.controlOutFrunkUnlock);
    }
  };

  const onPressUnLockTrunk = async () => {
    const unLockTrunkResult = await unLockTrunk(accessToken, id);
    if (unLockTrunkResult?.result) {
      setimageBack(backgroundImage.controlOutTrunkUnlock);
    }
  };

  useEffect(() => {
    switchBackInit();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.goBack}>🔙</Text>
        </TouchableOpacity>
        <ImageBackground source={imageBack} style={styles.carOutLook}>
          <TouchableOpacity onPress={onPressUnLockFrunk}>
            <Text style={styles.frunkOpen}>123</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressLockUnlockDoors}>
            <Text style={styles.carLock}>123</Text>
          </TouchableOpacity>
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
    height: '100%',
    alignItems: 'center',
  },
});

export default ControlScreen;
