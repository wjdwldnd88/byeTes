import {entryUrl} from '../Api/Common';

export const WakeUpVehicle = async (
  accessToken: string,
  id: number,
): Promise<null> => {
  console.log('***********WakeUpVehicle************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const wakeUpUrl = entryUrl + '/api/1/vehicles/' + id + '/wake_up';
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

export interface Iresponse {
  reason: string;
  result: boolean;
}

export const unLockDoors = async (
  accessToken: string,
  Id: number,
): Promise<Iresponse | undefined> => {
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
      return;
    }
    const result = await httpResponse.json();
    // console.log('result : ', result);
    const resultResponse = result.response;
    // console.log('result_ : ', result_);
    return resultResponse;
  } catch (e) {
    console.log('unLockDoors error');
    console.log('e : ', e);
    throw e;
  }
};

export const LockDoors = async (
  accessToken: string,
  Id: number,
): Promise<Iresponse | undefined> => {
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
      return;
    }
    const result = await httpResponse.json();
    // console.log('result : ', result);
    const resultResponse = result.response;
    // console.log('result_ : ', result_);
    return resultResponse;
  } catch (e) {
    console.log('LockDoors error');
    console.log('e : ', e);
    throw e;
  }
};

export interface ITrunkResponse {
  car: string;
  cause: string;
  status: string;
  token: string;
}

export const unLockFrunk = async (
  accessToken: string,
  Id: number,
): Promise<ITrunkResponse | undefined> => {
  console.log('***********unLockFrunk************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const unLockFrunkUrl =
      'https://tesla-info.com/api/control_v2.php?token=' +
      accessToken +
      '&request=actuate_trunk&value=front';

    const httpResponse = await fetch(unLockFrunkUrl, {
      method: 'POST',
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return;
    }
    const result = await httpResponse.json();
    // console.log('result : ', result);
    const unLockFrunkPram: ITrunkResponse = result;

    return unLockFrunkPram;
  } catch (e) {
    console.log('unLockFrunk error');
    console.log('e : ', e);
    throw e;
  }
};

export const unLockTrunk = async (
  accessToken: string,
  Id: number,
): Promise<ITrunkResponse | undefined> => {
  console.log('***********unLockTrunk************');
  try {
    const BearerAccessToken = 'Bearer ' + accessToken;
    const unLockTrunkUrl =
      'https://tesla-info.com/api/control_v2.php?token=' +
      accessToken +
      '&request=actuate_trunk&value=rear';
    // entryUrl + '/api/1/vehicles/' + Id + '/command/actuate_trunk';
    // console.log('body_bearer : ', BearerAccessToken);
    // console.log('vehicle_data_URL : ', vehicle_data_URL);

    const httpResponse = await fetch(unLockTrunkUrl, {
      method: 'POST',
      /*headers: {
        Authorization: BearerAccessToken,
        which_trunk: 'rear',
      },*/
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      console.log('httpResponse : ', httpResponse);
      return;
    }
    const result = await httpResponse.json();
    console.log('result : ', result);
    const unLockTrunkPram: ITrunkResponse = result;
    return unLockTrunkPram;
  } catch (e) {
    console.log('unLockTrunk error');
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
