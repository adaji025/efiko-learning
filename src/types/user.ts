export type UserProfileTypes = {
  success: boolean;
  msg: string;
  data: Data;
  ratings: RatingTypes[][];
};

export interface Data {
  tutorEducationDetails: TutorEducationDetails;
  studentEducationDetails: StudentEducationDetails;
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
  fullName: string;
  userName: string;
  profileImage: string;
  description: string;
  loginCode: string;
}

export interface TutorEducationDetails {
  education: string;
  teachingExperience: string;
  nationalId: string;
  educationDoc: string;
}

export interface StudentEducationDetails {
  subject: string[];
  education: string;
  majors: string;
}

export type RatingTypes = {
  rate: number;
  recommendTutor: string;
  review: string;
  ratedBy?: RatedBy;
  _id: string;
};

export interface RatedBy {
  _id: string;
  fullName: string;
  userName: string;
}
