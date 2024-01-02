import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const getTutors = (limit: number, skip: number, search: string) => {
    return new Promise((resolve, reject) => {
      AxoisApi.get(
        `${APIS.ADMIN}/tutor?limit=${limit}&skip=${skip}&search=${search}`
      )
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };