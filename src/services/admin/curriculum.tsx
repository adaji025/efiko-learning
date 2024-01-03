import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const addCurriculum = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.CURRICULUM}/curriculum`, data, {
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

export const getCurriculums = (limit: number, skip: number, search: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.CURRICULUM}/curriculum?limit=${limit}&skip=${skip}&search=${search}`
    )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
