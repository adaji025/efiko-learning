import AxoisApi from "../api";
import { APIS } from "../api/api";

export const getTutorSession = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSION.SESSION}?tutorId=${id}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSession = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(APIS.SESSION.SESSION)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addSession = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.SESSION.SESSION, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
