export type AdminState = {
  success: boolean;
  msg: string;
  data: AdminTypes[];
  length: number;
};

export type AdminTypes = {
  _id: string;
  fullName: string;
  image?: string;
  email: string;
  isDeleted: boolean;
  status: string;
  action: string;
  accountType: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
