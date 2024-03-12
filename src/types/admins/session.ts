export type AdminSessionState = {
  success: boolean;
  msg: string;
  data: AdminSessionType[];
  length: number;
  total: number;
};

export type AdminSessionType = {
  _id: string;
  title: string;
  curriculumId: CurriculumTypes;
  tutorId: TutorTypes;
  studentId: studentTypes;
  category: string;
  description: string;
  outcome: string;
  duration: string;
  meetingLink: string;
  recordingLink: string;
  passCode: string;
  start: boolean;
  date: string;
  time: string;
  meetingPassword: string;
  averageRating: number;
  status: string;
  type: string;
  free: boolean;
  rating: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CurriculumTypes = {
  _id: string;
  uniqueId: string;
  title: string;
  description: string;
  pdfFile: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TutorTypes {
  _id: string;
  email: string;
  fullName: string;
}
export type studentTypes = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};
