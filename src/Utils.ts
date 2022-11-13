import {SHA256} from 'crypto-js';

export const makeRandomString = (length: number): string => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const encryptSHA256 = (data: string): string => {
  return SHA256(data).toString();
};
