import AxoisApi from "../api";
import { APIS } from "../api/api";

export const addAdmin = (data: any) => {
    return new Promise((resolve, reject) => {
      AxoisApi.post(`${APIS.ADMIN.ADMIN}`, data, {
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