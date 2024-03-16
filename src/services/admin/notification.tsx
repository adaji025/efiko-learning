import AxoisApi from "../../api";
import { APIS } from "../../api/api";


export const getAdminNotification = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.NOTIFICATION.GET_ADMIN_NOTIFICATION}&sort=desc`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
