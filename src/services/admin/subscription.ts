import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const getSbubscritions = (limit: number, skip: number, search: string) => {
    return new Promise((resolve, reject) => {
      AxoisApi.get(
        `${APIS.SUBSCRIPTION}?limit=${limit}&skip=${skip}&search=${search}`
      )
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };