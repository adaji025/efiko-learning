import AxoisApi from "../api";
import { APIS } from "../api/api";

export const sendReport = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.REPORT.SEND_REPORT, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
