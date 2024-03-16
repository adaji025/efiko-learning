import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const getReport = (limit: number, skip: number, search: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.REPORT.SEND_REPORT}?limit=${limit}&skip=${skip}&search=${search}&sort=desc`
    )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resolveReport = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.REPORT.SEND_REPORT}/${id}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
