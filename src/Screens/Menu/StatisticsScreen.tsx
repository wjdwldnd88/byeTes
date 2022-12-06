import {NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStatisticsData, ITimeRange} from '../../Api/PrivateServerApi';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';

export interface ICStatisticsScreenProps {
  id: number;
}

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.StatisticsScreen
>;

interface ISpendingData {
  date: string;
  battery_level_increment: number;
  battery_range: number;
  odometer: number;
}

const StatisticsScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;
  const {id} = props.route.params;

  const [day0Data, setDay0Data] = useState<ISpendingData | undefined>();
  const [day1Data, setDay1Data] = useState<ISpendingData | undefined>();
  const [day2Data, setDay2Data] = useState<ISpendingData | undefined>();

  useEffect(() => {
    spendingData(getLocalDayTimeRange(0)).then(data => {
      setDay0Data(data);
    });

    spendingData(getLocalDayTimeRange(1)).then(data => {
      setDay1Data(data);
    });

    spendingData(getLocalDayTimeRange(2)).then(data => {
      setDay2Data(data);
    });
  }, []);

  const getLocalDayTimeRange = (dayBeforeNow: number): ITimeRange => {
    const from = dayjs()
      .subtract(dayBeforeNow, 'days')
      .startOf('day')
      .toISOString();
    const to = dayjs()
      .subtract(dayBeforeNow, 'days')
      .endOf('day')
      .toISOString();

    console.log('from date:', from);
    console.log('to date:', to);

    return {from, to};
  };

  const spendingData = async (
    timeRange: ITimeRange,
  ): Promise<ISpendingData | undefined> => {
    const data = await getStatisticsData(id, timeRange);

    if (!data || data.length === 0) {
      return;
    }

    const firstData = data[0];
    const lastData = data.pop();

    console.log('first data:', firstData);
    console.log('last data', lastData);

    const result: ISpendingData = {
      date: dayjs(firstData.date).format('YYYY-MM-DD'),
      battery_level_increment:
        firstData.battery_level -
        (lastData?.battery_level ?? firstData.battery_level),
      battery_range:
        firstData.battery_range -
        (lastData?.battery_range ?? firstData.battery_range),
      odometer: (lastData?.odometer ?? firstData.odometer) - firstData.odometer,
    };

    return result;
  };

  const mileToKillometer = (mile: number): number => {
    return mile * 1.61;
  };

  const renderDay = (data: ISpendingData | undefined): JSX.Element | null => {
    if (!data) {
      return null;
    }

    const {date, battery_level_increment, battery_range} = data;

    const odometer = mileToKillometer(data.odometer);

    const efficiency = (odometer / mileToKillometer(battery_range)) * 100;

    return (
      <View style={styles.container}>
        <View style={styles.dataRaw}>
          <Text style={styles.dataText}>날짜</Text>

          <Text style={styles.dataText}>{date}</Text>
        </View>

        <View style={styles.dataRaw}>
          <Text style={styles.dataText}>
            {battery_level_increment < 0 ? '배터리 충전량' : '배터리 소모량'}
          </Text>

          <Text style={styles.dataText}>
            {Math.abs(battery_level_increment)}%
          </Text>
        </View>

        <View style={styles.dataRaw}>
          <Text style={styles.dataText}>주행 거리</Text>

          <Text style={styles.dataText}>{odometer} km</Text>
        </View>

        {battery_level_increment >= 0 && (
          <View style={styles.dataRaw}>
            <Text style={styles.dataText}>배터리 효율</Text>

            <Text style={styles.dataText}>{efficiency.toFixed(2)}%</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.goBack}>🔙</Text>
      </TouchableOpacity>

      {renderDay(day0Data)}
      {renderDay(day1Data)}
      {renderDay(day2Data)}
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
    alignItems:'center',
    flex: 1,
  },

  dataText: {
    fontSize: 25,
  },
});

export default StatisticsScreen;
