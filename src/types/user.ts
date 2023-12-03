import { SessionTypes } from "./session";

export type UserProfileTypes = {
  success: boolean;
  msg: string;
  data: Data;
  sessions: SessionTypes[];
};

export interface Data {
  tutorEducationDetails: TutorEducationDetailsTypes;
  studentEducationDetails: StudentEducationDetailsTypes;
  _id: string;
  email: string;
  accountType: string;
  isDelete: boolean;
  isVerified: boolean;
  verificationOtp: string;
  verified: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  age: number;
  country: string;
  description: string;
  fullName: string;
}

export type TutorEducationDetailsTypes = {
  education: string;
  educationDoc: string[];
  nationalId: string;
};

export type StudentEducationDetailsTypes = {
  subject: any[];
};



export interface TutorId {
  _id: string;
  email: string;
  fullName: string;
}
