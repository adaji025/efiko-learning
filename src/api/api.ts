const api: string = import.meta.env.VITE_APP_API!;

export const APIS = {
  USER: {
    USER: `${api}/user`,
    LOGIN: `${api}/user/login`,
    STUDENT_LOGIN: `${api}/user/student-login`,
  },
  ADMIN: `${api}/admin`,
  CURRICULUM: `${api}/curriculum`,
  SUBSCRIPTION: `${api}/subscription`,

  AUTH: {
    RESET_PASSWORD: `${api}/auth/reset-password`,
    FORGOT_PASSWORD: `${api}/auth/forgot-password`,
    VERIFY_USER: `${api}/auth/verify`,
    SEND_OTP: `${api}/auth/verify-otp`,
    LOGIN_CODE: `${api}/auth/login-code`,
  },
  SESSION: {
    SESSION: `${api}/session`,
  },
  REPORT: {
    SEND_REPORT: `${api}/report`,
  },
  NOTIFICATION: {
    GET_NOTIFICATION: (id: string) => `${api}/notification?recipientId=${id}`,
  },
};
