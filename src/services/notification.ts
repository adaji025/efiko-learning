import AxoisApi from "../api";
import { APIS } from "../api/api";

export const getNotification = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.NOTIFICATION.GET_NOTIFICATION(id)}&sort=desc`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
