export type SessionState = {
  success: boolean;
  msg: string;
  data: SessionTypes[];
  length: number;
  total: number;
};

export type SessionTypes = {
  _id: string;
  title: string;
  tutorId: TutorId;
  studentId: StudentTypes;
  category: string;
  description: string;
  outcome: string;
  start: boolean;
  meetingLink: string;
  recordingLink: string;
  passCode: string;
  date: string;
  time: string;
  duration: string;
  charges: number;
  averageRating: number;
  status: string;
  type: string;
  rating: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TutorId {
  _id: string;
  fullName: string;
  userName: string;
  profileImage: string;
}

export interface Rating {
  rate: number;
  recommendTutor: string;
  review: string;
  _id: string;
  ratedBy?: RatedBy;
}

export interface RatedBy {
  _id: string;
  fullName: string;
  userName: string;
}

export interface StudentTypes {
  _id: string;
  email: string
  firstName: string
  lastName: string
}
