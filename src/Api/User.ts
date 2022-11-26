import { entryUrl } from './Common';

interface IUser {
  email: string;
  full_name: string;
  profile_image_url: string;
}

export const requestUser = async (access_token: string): Promise<IUser | undefined> => {
  const userUrl = entryUrl + '/api/1/vehicles';

  try {
    const httpResponse = await fetch(userUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
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
