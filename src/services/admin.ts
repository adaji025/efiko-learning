import AxoisApi from "../api";
import { APIS } from "../api/api";

export const addAdmin = (data: any) => {
    return new Promise((resolve, reject) => {
      AxoisApi.post(`${APIS.ADMIN}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getAdmins = (limit: number, skip: number, search: string) => {
    return new Promise((resolve, reject) => {
      AxoisApi.get(
        `${APIS.ADMIN}?limit=${limit}&skip=${skip}&search=${search}`
      )
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };