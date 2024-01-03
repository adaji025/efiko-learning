import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const addCurriculum = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.CURRICULUM}`, data, {
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
      `${APIS.CURRICULUM}?limit=${limit}&skip=${skip}&search=${search}`
    )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const deleteCurriculum = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.CURRICULUM}/${id}` )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCurriculum = (id:string, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.CURRICULUM}/${id}`, data, {
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