import Realm, { Results } from 'realm';

export interface IAuthData {
  access_token: string;
  refresh_token: string;
  id_token: string;
  date: string;
  expires_in: number;
  state: string;
  token_type: string;
}

const AUTH_INFO = 'AuthInfo';

export const authSchema = {
  name: AUTH_INFO,
  properties: {
    _id: 'int',
    access_token: 'string',
    refresh_token: 'string',
    id_token: 'string',
    date: 'string',
    expires_in: 'int',
    state: 'string',
    token_type: 'string',
  },
  primaryKey: '_id',
};

let realmInstance: Realm | null = null;

export const authInfoRealm = async (): Promise<Realm> => {
  if (!realmInstance) {
    realmInstance = await Realm.open({
      schema: [authSchema],
    });
  }

  return realmInstance;
};

export const writeAuthInfo = async (userInfo: IAuthData): Promise<void> => {
  try {
    const realm = await authInfoRealm();

    realm.write(() => {
      realm.create(AUTH_INFO, { _id: 0, ...userInfo }, Realm.UpdateMode.Modified);
    });
  } catch (e) {
    console.log('writeAuthInfo error');
  }
};

export const readAuthInfo = async (): Promise<IAuthData | undefined> => {
  try {
    const realm = await authInfoRealm();

    const userData: Results<IAuthData> = realm
      .objects<IAuthData>(AUTH_INFO)
      .filtered('_id==0');

    return userData ? userData[0] : undefined;
  } catch (e) {
    console.log('error:', e);
  }
  return;
};
