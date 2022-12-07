import { privateServerUrl } from "./Common";
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

export interface ITimeRange {
  from: string;
  to: string;
}

export const transferTokenToPrivateServer = async (access_token: string, id: number): Promise<boolean> => {
  try {
    const body = { id, access_token }

    const pushTokenUrl = `${privateServerUrl}/access_token`

    const httpResponse = await fetch(pushTokenUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    console.log("httpResponse:", httpResponse)

    return httpResponse.ok

  } catch (e) {
    console.log("private server is off")
  }

  return false;
}

export const getStatisticsData = async (id: number, timeRange:ITimeRange): Promise<IStatisticsData[] | void> => {
  const {from, to} = timeRange
  
  try {
    const vehicleDataUrl = `${privateServerUrl}/vehicle_data/${id}?from=${from}&to=${to}`

    const httpResponse = await fetch(vehicleDataUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("httpResponse:", httpResponse)

    return await httpResponse.json();

  } catch (e) {
    console.log('get data from private server error')
  }
}