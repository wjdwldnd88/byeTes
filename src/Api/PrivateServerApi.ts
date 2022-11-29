import { privateServerUrl } from "./Common";

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