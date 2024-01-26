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
  start: boolean;
  timeAndDate: string;
  time: string;
  meetingPassword: string;
  averageRating: number;
  status: string;
  type: string;
  rating: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CurriculumTypes = {
  _id: string;
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
  email: string;
  _id: string;
};
