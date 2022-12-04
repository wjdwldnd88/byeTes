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
  battery_level: number;
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

    spendingData(getLocalDayTimeRange(-1)).then(data => {
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
      battery_level:
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

    const {date, battery_level, battery_range} = data;

    const odometer = mileToKillometer(data.odometer);

    const efficiency = (odometer / mileToKillometer(battery_range)) * 100;

    return (
      <View
        style={{
          height: '30%',
          backgroundColor: 'white',
          borderRadius: 10,
          margin: 10,
        }}>
        <Text>날짜 : {date}</Text>
        <Text>배터리 소모량 : {battery_level}%</Text>
        <Text>주행 거리 : {odometer}km</Text>
        <Text>배터리 효율 : {efficiency.toFixed(2)}%</Text>
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
  goBack: {
    color: 'black',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
  },
});

export default StatisticsScreen;
