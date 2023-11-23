import AxoisApi from "../api";
import { APIS } from "../api/api";

export const getSession = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(APIS.SESSION.SESSION)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};