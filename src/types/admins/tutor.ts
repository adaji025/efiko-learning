export type TutorState = {
  success: boolean;
  msg: string;
  data: TutorTypes[];
  length: number;
  total: number;
};

export type TutorTypes = {
  tutorEducationDetails: TutorEducationDetails;
  studentEducationDetails: StudentEducationDetails;
  _id: string;
  fullName: string;
  description: string;
  approvalStatus: string;
  age: number;
  phone: string;
  country: string;
  email: string;
  subjectInterest: string[];
  accountType: string;
  isDelete: boolean;
  isVerified: boolean;
  status: string;
  action: string;
  verified: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TutorEducationDetails {
  educationDoc: any[];
}

export interface StudentEducationDetails {
  subject: any[];
}
