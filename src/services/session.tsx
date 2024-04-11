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
    AxoisApi.get(`${APIS.SESSION.SESSION}&sort=desc`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getExploreSession = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSION.SESSION}?book=false&sort=desc`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTutorUpcomingSession = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSION.SESSION}?start=false&tutorId=${id}&sort=desc`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUpcomingSession = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.SESSION.SESSION}?status=approved&sort=desc`
    )
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStudentRecordedSession = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSION.SESSION}?type=recorded&sort=desc`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getStudentFreeSession = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSION.SESSION}?free=true&book=false`)
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

export const updateSession = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.SESSION.SESSION}/${id}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
