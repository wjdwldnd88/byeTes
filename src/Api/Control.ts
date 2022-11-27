import {entryUrl} from '../Api/Common';

export const WakeUpVehicle = async (
  accessToken: string,
  Id: number,
): Promise<null> => {
  console.log('***********WakeUpVehicle************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const wakeUpUrl = entryUrl + '/api/1/vehicles/' + Id + '/wake_up';
    console.log('wakeUpUrl : ', wakeUpUrl);
    // console.log('vehicle_data_URL : ', vehicle_data_URL);

    const httpResponse = await fetch(wakeUpUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return null;
    }
    const result = await httpResponse.json();
    console.log('WakeUpVehicle result : ', result);
    const result_ = result.response;
    console.log('WakeUpVehicle result_ : ', result_);
    return null;
  } catch (e) {
    console.log('WakeUpVehicle error');
    console.log('e : ', e);
    throw e;
  }
};

export const unLockDoors = async (
  accessToken: string,
  Id: number,
): Promise<null> => {
  console.log('***********unLockDoors************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const unLockDoorsUrl =
      entryUrl + '/api/1/vehicles/' + Id + '/command/door_unlock';
    console.log('body_bearer : ', BearerAccessToken);
    // console.log('vehicle_data_URL : ', vehicle_data_URL);

    const httpResponse = await fetch(unLockDoorsUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return null;
    }
    const result = await httpResponse.json();
    console.log('result : ', result);
    const result_ = result.response;
    console.log('result_ : ', result_);
    return null;
  } catch (e) {
    console.log('unLockDoors error');
    console.log('e : ', e);
    throw e;
  }
};

export const LockDoors = async (
  accessToken: string,
  Id: number,
): Promise<null> => {
  console.log('***********LockDoors************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const LockDoorsUrl =
      entryUrl + '/api/1/vehicles/' + Id + '/command/door_lock';
    console.log('body_bearer : ', BearerAccessToken);
    // console.log('vehicle_data_URL : ', vehicle_data_URL);

    const httpResponse = await fetch(LockDoorsUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return null;
    }
    const result = await httpResponse.json();
    console.log('result : ', result);
    const result_ = result.response;
    console.log('result_ : ', result_);
    return null;
  } catch (e) {
    console.log('LockDoors error');
    console.log('e : ', e);
    throw e;
  }
};

export const HonkHorn = async (
  accessToken: string,
  Id: number,
): Promise<null> => {
  console.log('***********HonkHorn************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const HonkHornUrl =
      entryUrl + '/api/1/vehicles/' + Id + '/command/honk_horn';
    console.log('body_bearer : ', BearerAccessToken);
    // console.log('vehicle_data_URL : ', vehicle_data_URL);

    const httpResponse = await fetch(HonkHornUrl, {
      method: 'POST',
      headers: {
        Authorization: BearerAccessToken,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return null;
    }
    const result = await httpResponse.json();
    console.log('result : ', result);
    const result_ = result.response;
    console.log('result_ : ', result_);
    return null;
  } catch (e) {
    console.log('HonkHorn error');
    console.log('e : ', e);
    throw e;
  }
};
