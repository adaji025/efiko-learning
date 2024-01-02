import AxoisApi from "../api";
import { APIS } from "../api/api";

export const userRegistration = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.USER.USER, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userlogin = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.USER.LOGIN, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const adminlogin = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.ADMIN}/login`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loginCode = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.AUTH.LOGIN_CODE, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const studentLogin = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.USER.STUDENT_LOGIN, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userVerification = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.AUTH.VERIFY_USER, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const forgotPassword = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.AUTH.FORGOT_PASSWORD, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resetPassword = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(APIS.AUTH.RESET_PASSWORD, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
