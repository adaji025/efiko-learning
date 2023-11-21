import AxoisApi from "../api";
import { APIS } from "../api/api";

export const getUser = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.USER.USER}?_id=${id}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
