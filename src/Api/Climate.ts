import {useRef} from 'react';
import {entryUrl} from '../Api/Common';

export interface Iresponse {
  result: boolean;
}

export const autoConditionStart = async (
  accessToken: string,
  id: number,
): Promise<boolean> => {
  console.log('***********autoConditionStart************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const autoConditionStartUrl =
      entryUrl + '/api/1/vehicles/' + id + '/command/auto_conditioning_start';
    console.log('autoConditionStartUrl : ', autoConditionStartUrl);

    const httpResponse = await fetch(autoConditionStartUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return false;
    }
    const result = await httpResponse.json();
    // console.log('result : ', result);
    const resultResponse: Iresponse = result.response;
    // console.log('resultResponse : ', resultResponse.result);
    return resultResponse.result;
  } catch (e) {
    console.log('autoCondition error');
    console.log('e : ', e);
    throw e;
  }
};

export const autoConditionStop = async (
  accessToken: string,
  id: number,
): Promise<boolean> => {
  console.log('***********autoConditionStop************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const autoConditionStopUrl =
      entryUrl + '/api/1/vehicles/' + id + '/command/auto_conditioning_stop';
    console.log('autoConditionStopUrl : ', autoConditionStopUrl);

    const httpResponse = await fetch(autoConditionStopUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return false;
    }
    const result = await httpResponse.json();
    // console.log('autoConditionStop result : ', result);
    const resultResponse: Iresponse = result.response;

    return resultResponse.result;
  } catch (e) {
    console.log('autoConditionStop error');
    console.log('e : ', e);
    throw e;
  }
};

export const setTemperature = async (
  accessToken: string,
  driverTemp: number,
): Promise<IHeatResponse | undefined> => {
  console.log('***********setTemperature************');
  try {
    const setTemperatureUrl =
      'https://tesla-info.com/api/control_v2.php?token=' +
      accessToken +
      '&request=set_temps' +
      '&value=' +
      driverTemp;

    console.log('setTemperatureUrl : ', setTemperatureUrl);

    const httpResponse = await fetch(setTemperatureUrl, {
      method: 'POST',
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return;
    }
    const result = await httpResponse.json();
    console.log('setTemperature result : ', result);
    const resultResponse: IHeatResponse = result;

    return resultResponse;
  } catch (e) {
    console.log('setTemperature error');
    console.log('e : ', e);
    throw e;
  }
};

export const setPreconditioningMax = async (
  accessToken: string,
  id: number,
  onOff: boolean,
): Promise<boolean> => {
  console.log('***********setTemperature************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const setPreconditioningMaxUrl =
      entryUrl +
      '/api/1/vehicles/' +
      id +
      'command/set_preconditioning_max?on=' +
      onOff;
    console.log('setPreconditioningMaxUrl : ', setPreconditioningMaxUrl);

    const httpResponse = await fetch(setPreconditioningMaxUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return false;
    }
    const result = await httpResponse.json();
    console.log('setTemperature result : ', result);
    const resultResponse: Iresponse = result.response;

    return resultResponse.result;
  } catch (e) {
    console.log('setTemperature error');
    console.log('e : ', e);
    throw e;
  }
};

export interface IHeatResponse {
  car: string;
  cause: string;
  status: string;
  token: string;
}

export const setSeatHeater = async (
  accessToken: string,
  id: number,
  heater: string,
  level: number,
): Promise<IHeatResponse | undefined> => {
  console.log('***********setTemperature************');
  try {
    const setSeatHeaterUrl =
      'https://tesla-info.com/api/control_v2.php?token=' +
      accessToken +
      '&request=' +
      heater +
      '&value=' +
      level;

    console.log('setSeatHeaterUrl : ', setSeatHeaterUrl);

    const httpResponse = await fetch(setSeatHeaterUrl, {
      method: 'POST',
      headers: {},
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return;
    }
    const result = await httpResponse.json();
    // console.log('setSeatHeater result : ', result);
    const resultResponse: IHeatResponse = result;

    return resultResponse;
  } catch (e) {
    console.log('setSeatHeater error');
    console.log('e : ', e);
    throw e;
  }
};
