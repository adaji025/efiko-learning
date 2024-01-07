import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const addStudent = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.ADMIN}/student`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const changeStudentActiveState = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.ADMIN}/student/${id}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStudents = (limit: number, skip: number, search: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.ADMIN}/student?limit=${limit}&accountType=student&skip=${skip}&search=${search}`
    )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
