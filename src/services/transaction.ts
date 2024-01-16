import AxoisApi from "../api";
import { APIS } from "../api/api";

export const initiateTransaction = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.TRANSACTION}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};