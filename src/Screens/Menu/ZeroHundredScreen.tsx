import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {requestDriveState} from '../../Api/State';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';

export interface IZeroHundredScreenProps {
  id: number;
  accessToken: string;
}

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.ZeroHundredScreen
>;

const checkSpeed = 62; //해당 스피드에 도달 시 몇초나 걸렸는지 확인

const ZeroHundredScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;
  const {id, accessToken} = props.route.params;

  const [resultTime, setResultTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [timestampState, setTimestampState] = useState<number[]>([0]);
  const [speedDataState, setSpeedDataState] = useState<number[]>([0]);

  //측정할 때마다 초기화해주어야 하는 변수들
  const speed = useRef(0);
  const firstTimestamp = useRef(0);
  const timestamp = useRef<number[]>([]);
  const speedData = useRef<number[]>([]);
  const testSpeedCount = useRef(0);

  //true 면 인터벌 수행, false 면 수행하지 않음
  // const isZero100CheckInterval = useRef(false);
  const zero100CheckInterval = useRef<number | null>(null);

  const resetChart = () => {
    //init value set
    speed.current = 0;
    firstTimestamp.current = 0;
    timestamp.current = [0];
    speedData.current = [0];
    testSpeedCount.current = 0;
  };

  const makeZeroSpeedDummyForTest = (): number => {
    console.log('making test set');
    if (testSpeedCount.current < 5) {
      testSpeedCount.current++;
      return 0;
    } else {
      return speed.current + Math.ceil(Math.random() * 20);
    }
  };

  const timeStampToSec = (timestamp: number, firstTimestamp: number) => {
    console.log('current :', timestamp);
    console.log('first :', firstTimestamp);
    console.log('result:', Math.round((timestamp - firstTimestamp) / 1000));

    return Number(((timestamp - firstTimestamp) / 1000).toFixed(2));
  };

  //등가속도라 가정하고 가속도 구하는 공식
  const getAcceleration = (v0: number, v1: number, t0: number, t1: number) => {
    return (v1 - v0) / (t1 - t0);
  };
  //등가속도라 가정하고 걸린 시간 구하는 공식
  const getTime = (v0: number, v1: number, a: number) => {
    return (v1 - v0) / a;
  };

  //제로백 결과값 후처리
  //0.5초 사이에 차가 출발하고, 100에 도달하는 시간도 0.5초 사이에 걸쳐있기 때문에 값을 보정해준다
  const calculateZero100 = () => {
    //speed 0 인 부분 싹 지우고 시작 타임스템프 설정
    let startPoint = 0;
    for (let i = 0; i < speedData.current.length; i++) {
      if (speedData.current[i] != 0) {
        startPoint = i;
        break;
      }
    }
    console.log('start point :::', startPoint);
    timestamp.current.splice(0, startPoint - 1);
    speedData.current.splice(0, startPoint - 1);

    console.log('timestampData:', timestamp.current);
    console.log('speedData:', speedData.current);

    let firstTimestamp = timestamp.current[0];
    let tempTimestamp: number[] = [];

    timestamp.current.forEach(element => {
      tempTimestamp.push(timeStampToSec(element, firstTimestamp));
    });

    timestamp.current = tempTimestamp;
    tempTimestamp = [];

    console.log('timestamp.current2:', timestamp.current);

    //시작 시각 후처리 앞에 유의미한 데이터 2개로 가속도와 시간을 구함
    let a0 = getAcceleration(
      speedData.current[1],
      speedData.current[2],
      timestamp.current[1],
      timestamp.current[2],
    );
    let t0 = getTime(speedData.current[0], speedData.current[1], a0);

    console.log('a0: ', a0);
    console.log('t0: ', t0);
    //시작
    //유효한 시작시간이 있으면
    if (0 < t0 && t0 < timestamp.current[1]) {
      //
      console.log('gyubeom 2');
      // speedData.splice(1, 0, 0);
      // timestamp.current.splice(0, 1, Number(t0.toFixed(2)));
      let startTime = timestamp.current[1] - Number(t0.toFixed(2));

      //모든 타임스템프를 당겨서 적용해준다
      timestamp.current.forEach(element => {
        tempTimestamp.push(element - startTime);
      });

      timestamp.current = tempTimestamp;
      timestamp.current[0] = 0;
      tempTimestamp = [];
      console.log('timestamp.current3:', timestamp.current);
    }

    //종료 시각 후처리 뒤에 checkSpeed 양 옆을 가로지르는 구간 찾아야 함!!!!!
    // 체크할 속력을 넘어가는 포인트
    let endPoint = 0;
    for (let i = 0; i < speedData.current.length; i++) {
      if (speedData.current[i] >= checkSpeed) {
        endPoint = i;
        break;
      }
    }

    let a1 = getAcceleration(
      speedData.current[endPoint - 1],
      speedData.current[endPoint],
      timestamp.current[endPoint - 1],
      timestamp.current[endPoint],
    );
    let t1 = getTime(speedData.current[endPoint - 1], checkSpeed, a1);

    console.log('a1: ', a1);
    console.log('t1: ', t1);

    if (
      0 < t1 &&
      t1 < timestamp.current[endPoint] - timestamp.current[endPoint - 1]
    ) {
      speedData.current.splice(endPoint, 0, checkSpeed);
      timestamp.current.splice(
        endPoint,
        0,
        timestamp.current[endPoint - 1] + Number(t1.toFixed(2)),
      );

      setResultTime(timestamp.current[endPoint]);
    }
    console.log('final speedData :', speedData);
    console.log('final timestamp.current :', timestamp.current);

    setSpeedDataState(speedData.current);
    setTimestampState(timestamp.current);
  };

  const stopZero100 = () => {
    if (!zero100CheckInterval.current) {
      return;
    }

    clearInterval(zero100CheckInterval.current);

    setTimeout(() => {
      zero100CheckInterval.current = null;
      calculateZero100();

      setIsProcessing(false);
    }, 1000);
  };

  const check0100 = (testSet = false) => {
    //버튼 실수로 중복해서 누르더라도 인터벌 2개 이상 안불리게
    if (zero100CheckInterval.current) {
      return;
    }
    console.log('start 0-100');

    setIsProcessing(true);

    // isZero100CheckInterval.current = true;
    testSpeedCount.current = 0;

    zero100CheckInterval.current = setInterval(async () => {
      let result = await requestDriveState(accessToken, id);
      console.log('homescreen result:', result);

      //todo : deal exception
      if (!result) {
        return;
      }

      if (testSet) {
        speed.current = makeZeroSpeedDummyForTest();
      } else {
        speed.current = Number(result.speed);
      }
      if (speed.current >= checkSpeed) {
        stopZero100();
      }

      console.log('speed : ', speed.current);
      console.log('time : ', result.timestamp);

      timestamp.current.push(result.timestamp);
      speedData.current.push(speed.current);
    }, 500);
  };

  console.log('timestamp:', timestamp.current);
  console.log('speedData:', speedData.current);

  const renderChart = (): JSX.Element | null => {
    // if (timestamp.current.length === 0 || speedData.current.length === 0) {
    //   return null;
    // }
    return (
      <>
        <LineChart
          data={{
            labels: timestampState.map(t => t.toFixed(2) + ''),
            datasets: [
              {
                data: speedDataState,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="" //y 축 데이터 프리픽스
          yAxisSuffix=" mile/h" //y 축 데이터 서픽스
          yAxisInterval={5} // optional, defaults to 1
          chartConfig={{
            backgroundColor: isProcessing ? '#e26a00' : '#91e8ff',
            backgroundGradientFrom: isProcessing ? '#e26a00' : '#91e8ff',
            // backgroundGradientTo: '#000000',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '1', // 포인트 지름
              strokeWidth: '1', //포인트 외곽선 굵기
              stroke: '#ffa726',
            },
          }}
          // bezier
          style={{
            marginVertical: 8,
            // borderRadius: 16,
          }}
        />
        {isProcessing && (
          <ActivityIndicator
            style={{position: 'absolute'}}
            size="large"
            color="black"
          />
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.goBack}>🔙</Text>
      </TouchableOpacity>

      <View style={{flex: 1, backgroundColor: 'white'}} />

      <View style={{backgroundColor: 'white', paddingBottom: 50}}>
        <View
          style={{
            height: 220,
            marginBottom: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {renderChart()}
        </View>

        <Text style={{padding: 20, fontSize: 25}}>
          0 to 62 mile : {resultTime.toFixed(2)} s
        </Text>

        <Button
          title="test zero-100"
          onPress={() => {
            resetChart();
            check0100(true);
          }}
        />
        <View style={{height: 20}} />

        <Button
          title="check zero-100"
          onPress={() => {
            resetChart();
            check0100();
          }}
        />
        <View style={{height: 20}} />

        <Button
          title="stop zero-100"
          onPress={() => {
            console.log('stop 0-100');
            stopZero100();
          }}
        />
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
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 20,
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

  dataRaw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  dataText: {
    fontSize: 25,
  },
});

export default ZeroHundredScreen;
