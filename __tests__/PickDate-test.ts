import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; 

interface IStatisticsData {
  _id: number;
  id: number;
  date: string;
  battery_level: number
  battery_range: number;
  odometer: number;
  heading: number;
  latitude: number;
  longitude: number;
}

interface ISpendingData {
  date: string;
  battery_level: number
  battery_range: number;
  odometer: number;
}

interface ITimeRange {
  from: string;
  to: string;
}

dayjs.extend(utc)

const getLocalDayTimeRange = (dayAfterNow: number): ITimeRange => {
  
  const from = dayjs().add(dayAfterNow, 'D').startOf('day').toISOString()
  const to = dayjs().add(dayAfterNow, 'D').endOf('day').toISOString()

  return { from, to }
}

it('get day range test', () => {
  const randString = getLocalDayTimeRange(0);

  expect(randString).toBe({ from: '', to: '' })
});



const mockData: IStatisticsData[] = [{
  "_id": 1,
  "id": 1492931717741044,
  "date": "2022-11-27T14:41:17.528Z",
  "battery_level": 46,
  "battery_range": 125,
  "odometer": 21108,
  "heading": 67,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 2,
  "id": 1492931717741044,
  "date": "2022-11-27T14:46:49.770Z",
  "battery_level": 46,
  "battery_range": 125,
  "odometer": 21108,
  "heading": 67,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 3,
  "id": 1492931717741044,
  "date": "2022-12-03T16:39:41.388Z",
  "battery_level": 56,
  "battery_range": 154,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 4,
  "id": 1492931717741044,
  "date": "2022-12-03T16:48:18.180Z",
  "battery_level": 56,
  "battery_range": 154,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 5,
  "id": 1492931717741044,
  "date": "2022-12-03T16:52:06.311Z",
  "battery_level": 56,
  "battery_range": 154,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 6,
  "id": 1492931717741044,
  "date": "2022-12-03T17:52:05.963Z",
  "battery_level": 56,
  "battery_range": 153,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 7,
  "id": 1492931717741044,
  "date": "2022-12-03T18:52:06.108Z",
  "battery_level": 55,
  "battery_range": 153,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 8,
  "id": 1492931717741044,
  "date": "2022-12-03T19:52:06.101Z",
  "battery_level": 55,
  "battery_range": 151,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 9,
  "id": 1492931717741044,
  "date": "2022-12-03T20:52:06.100Z",
  "battery_level": 55,
  "battery_range": 149,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 10,
  "id": 1492931717741044,
  "date": "2022-12-03T21:52:05.948Z",
  "battery_level": 55,
  "battery_range": 148,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 11,
  "id": 1492931717741044,
  "date": "2022-12-03T22:52:06.394Z",
  "battery_level": 55,
  "battery_range": 145,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 12,
  "id": 1492931717741044,
  "date": "2022-12-03T23:52:06.891Z",
  "battery_level": 54,
  "battery_range": 144,
  "odometer": 21178,
  "heading": 70,
  "latitude": 37,
  "longitude": 127
}, {
  "_id": 13,
  "id": 1492931717741044,
  "date": "2022-12-04T04:52:05.984Z",
  "battery_level": 49,
  "battery_range": 130,
  "odometer": 21181,
  "heading": 81,
  "latitude": 37,
  "longitude": 127
}]