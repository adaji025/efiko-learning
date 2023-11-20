import AxoisApi from "../api";
import { APIS } from "../api/api";

export const userlogin = (data: any) => {
    return new Promise((resolve, reject) => {
      AxoisApi.post(`${APIS.USER.LOGIN}`, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };