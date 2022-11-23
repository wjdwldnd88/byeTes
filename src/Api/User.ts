import {readAuthInfo} from '../RealmDB/Schema';
import {entryUrl} from './Common';

interface IUser {
  email: string;
  full_name: string;
  profile_image_url: string;
}

export const requestState = async (): Promise<IUser | undefined> => {
  const userUrl = entryUrl + '/api/1/vehicles';

  try {
    const authInfo = await readAuthInfo();

    const httpResponse = await fetch(userUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authInfo?.access_token}`,
      },
    });

    if (!httpResponse.ok) {
      return;
    }
    const result: IUser = await httpResponse.json();

    return result;
  } catch (e) {
    throw e;
  }
};
