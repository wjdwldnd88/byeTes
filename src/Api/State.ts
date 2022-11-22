import dayjs from 'dayjs';

const listUri = 'https://owner-api.teslamotors.com/api/1/vehicles';

/*
{
		"access_type": "OWNER",
		"api_version": 48,
		"backseat_token": null,
		"backseat_token_updated_at": null,
		"calendar_enabled": true,
		"color": null,
		"display_name": "뿡뿡이",
		"id": 1492931717741044,
		"id_s": "1492931717741044",
		"in_service": false,
		"option_codes": "AD15,AF00,APFB,APH4,AU3P,BC3B,BT37,CDM0,CH07,COKR,DRLH,DV4W,FC3P,FG31,FM3B,GLFR,HL31,HM30,ID3W,IL31,LTPB,MDL3,MR31,PPSW,PC30,REAP,RF3G,RS3H,S3PB,SA3P,SC04,STCP,SU3C,T3MA,TM00,TW00,UT3P,W38B,WR00,ZINV,MI01,PL30,SLR0,ST30,BG31,I36M,USSB,AUF1,RSF1,ILF1,FGF1,CPF1,P3WS",
		"state": "asleep",
		"tokens": [Array],
		"vehicle_id": 606446325,
		"vin": "5YJ3E1EB0LF695181"
	}
*/

export interface IVehicle {
  access_type: string;
  api_version: number;
  backseat_token?: string;
  backseat_token_updated_at?: string;
  calendar_enable: boolean;
  color: string;
  display_name: string;
  id: number;
  id_s: string;
  in_service: boolean;
  option_codes: string;
  state: string; //TODO: 값이 정해져있을테니 해당 값들을 추가로 enum 으로 만들기
  tokens: Array<any>;
  vehicle_id: number;
  vin: string;
}

type IVehicles = Array<IVehicle>;

export const requestState = async (body: string): Promise<IVehicle | null> => {
  try {
    const body_bearer = 'Bearer ' + body;

    //console.log('body: ', body);
    //console.log(body_bearer);

    const httpResponse = await fetch(listUri, {
      method: 'GET',
      headers: {
        Authorization: body_bearer,
      },
    });

    //console.log(httpResponse);

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');
      return null;
    }
    const result = await httpResponse.json();

    // console.log('result', result);

    const vehicle_status: IVehicles = result.response;
    console.log('aaa : ', vehicle_status[0].vehicle_id);

    //Object.entries(aaa).map();

    //const obj = JSON.parse(result);
    //console.log('obj : ', obj.response);

    return vehicle_status[0];
  } catch (e) {
    console.log('requestState error');
    console.log('e : ', e);
    throw e;
  }
};
