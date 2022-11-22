import dayjs from 'dayjs';
import {IAuthData, writeAuthInfo} from '../RealmDB/Schema';

const loginUrl = 'https://auth.tesla.com/oauth2/v3/token';
export const redirectUrl = 'https://auth.tesla.com/void/callback';

const requestAuth = async (body: any): Promise<boolean> => {
  try {
    const httpResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!httpResponse.ok) {
      return false;
    }
    const result = await httpResponse.json();

    const authData: IAuthData = {date: dayjs().toISOString(), ...result};

    console.log('makeAuthInfo:', authData);

    await writeAuthInfo(authData);

    return true;
  } catch (e) {
    console.log('requestAuth error');

    throw e;
  }
};

export const makeAuthInfo = async (
  code: string,
  code_verifier: string,
): Promise<boolean> => {
  const body = {
    grant_type: 'authorization_code',
    client_id: 'ownerapi',
    code,
    code_verifier,
    redirect_uri: redirectUrl,
  };

  try {
    return await requestAuth(body);
  } catch (e) {
    console.log('makeAuthInfo error');

    throw e;
  }
};

export const refreshAuthInfo = async (
  refreshToken: string,
): Promise<boolean> => {
  const body = {
    grant_type: 'refresh_token',
    client_id: 'ownerapi',
    refresh_token: refreshToken,
    scope: 'openid email offline_access',
  };

  try {
    return await requestAuth(body);
  } catch (e) {
    console.log('refreshAuthInfo error');

    throw e;
  }
};

// export const loginProcess =
