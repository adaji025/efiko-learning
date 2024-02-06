import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const getAdminUpcomingSession = (limit: number, skip: number, search: string) => {
    return new Promise((resolve, reject) => {
      AxoisApi.get(`${APIS.SESSION.SESSION}?limit=${limit}&skip=${skip}&search=${search}`)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
};
  
export const getSessionRequest = (limit: number, skip: number, search: string) => {
    return new Promise((resolve, reject) => {
      AxoisApi.get(`${APIS.SESSION.SESSION}?book=true&limit=${limit}&skip=${skip}&search=${search}`)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
};
  
export const getRecordedSession = (limit: number, skip: number, search: string) => {
    return new Promise((resolve, reject) => {
      AxoisApi.get(`${APIS.SESSION.SESSION}?type=recorded&limit=${limit}&skip=${skip}&search=${search}`)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };