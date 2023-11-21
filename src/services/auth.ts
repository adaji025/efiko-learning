import AxoisApi from "../api";
import { APIS } from "../api/api";

export const userRegistration = (data: any) => {
    return new Promise((resolve, reject) => {
      AxoisApi.post(APIS.USER.USER, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const userlogin = (data: any) => {
    return new Promise((resolve, reject) => {
      AxoisApi.post(APIS.USER.LOGIN, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  console.log(APIS.AUTH.VERIFY_USER)
export const userVerification = (data: any) => {
    return new Promise((resolve, reject) => {
      AxoisApi.post(APIS.AUTH.VERIFY_USER, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };