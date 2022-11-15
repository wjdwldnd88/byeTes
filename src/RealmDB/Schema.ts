import Realm, {Results} from 'realm';

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
    access_token: 'string',
    refresh_token: 'string',
    id_token: 'string',
    date: 'string',
    expires_in: 'int',
    state: 'string',
    token_type: 'string',
  },
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
  } catch (e) {
    console.log('write');
  }
  const realm = await authInfoRealm();

  realm.write(() => {
    realm.create(AUTH_INFO, userInfo, Realm.UpdateMode.Modified);
  });
};

export const readAuthInfo = async (): Promise<IAuthData | undefined> => {
  try {
    const realm = await authInfoRealm();

    const userData: Results<IAuthData> = realm.objects<IAuthData>(AUTH_INFO);

    return userData ? userData[0] : undefined;
  } catch (e) {
    console.log('error:', e);
  }
  return;
};
