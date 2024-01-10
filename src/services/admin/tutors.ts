import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const getTutors = (limit: number, skip: number, search: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.ADMIN}/tutor?limit=${limit}&accountType=tutor&skip=${skip}&search=${search}`
    )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllTutors = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.ADMIN}/tutor`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const approve_Reject_tutor = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.ADMIN}/tutor/${id}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const changeTutorActiveState = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.ADMIN}/tutor/${id}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
