export type UserTypes = {
    studentEducationDetails: StudentEducationDetails
    _id: string
    email: string
    password: string
    accountType: string
    isDelete: boolean
    isVerified: boolean
    verificationOtp: string
    verified: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface StudentEducationDetails {
    subject: any[]
  }
  