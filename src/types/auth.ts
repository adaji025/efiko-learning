

  export type ProfileTypes = {
    tutorEducationDetails: TutorEducationDetails
    studentEducationDetails: StudentEducationDetails
    _id: string
    email: string
    accountType: string
    isDelete: boolean
    isVerified: boolean
    verificationOtp: string
    verified: string
    createdAt: string
    updatedAt: string
    __v: number
    loginCode: string
    age: number
    country: string
    fullName: string
  }
  
  export interface TutorEducationDetails {
    educationDoc: any[]
  }
  
  export interface StudentEducationDetails {
    subject: string[]
    education: string
    majors: string
  }

  export type LoginResponseType = {
    fullName: string
    age: number
    country: string
    email: string
    accountType: string
    updatedProfile: boolean
    token: string
  }
  