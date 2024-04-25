export type ReportState = {
  success: boolean;
  msg: string;
  data: ReportTypes[];
  length: number;
  total: number;
};

export type ReportTypes = {
  _id: string;
  reportedBy: ReportedByTypes;
  title: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ReportedByTypes = {
  _id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
};
