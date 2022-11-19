import dayjs from 'dayjs';
import {
  authSchema,
  IAuthData,
  readAuthInfo,
  writeAuthInfo,
} from '../RealmDB/Schema';

const listUri = 'https://owner-api.teslamotors.com/api/1/vehicles';
const authData = new Realm({schema: [authSchema]});
console.log('authData : ', authData);
//const authKey = authData.objects('access_token');

export const requestState = async (body: string): Promise<boolean> => {
  try {
    const body_bearer = 'Bearer ' + body;

    console.log('body: ', body);
    console.log(body_bearer);

    const httpResponse = await fetch(
      listUri,
      {
        method: 'GET',
        headers: {
          Authorization: body_bearer,
        },
      },
      //body: JSON.stringify(body),
    );

    console.log(httpResponse);

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      return false;
    }
    const result = httpResponse.text();

    console.log('result', result);
    //const authData: IAuthData = {date: dayjs().toISOString(), ...result};

    //console.log('makeAuthInfo:', authData);

    //await writeAuthInfo(authData);

    return true;
  } catch (e) {
    console.log('requestState error');
    console.log('e : ', e);
    throw e;
  }
};
