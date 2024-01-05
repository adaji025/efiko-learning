export type StudentState = {
    success: boolean
    msg: string
    data: StudentsTypes[]
    length: number
    total: number
  }
  
  export type StudentsTypes = {
    tutorEducationDetails: TutorEducationDetailsTypes
    studentEducationDetails: StudentEducationDetailsTypes
    approvalStatus: string
    _id: string
    firstName: string
    lastName: string
    age: number
    phone: string
    country: string
    email: string
    subjectInterest: string[]
    accountType: string
    isDelete: boolean
    isVerified: boolean
    status: string
    action: string
    verified: string
    createdAt: string
    updatedAt: string
    __v: number
    fullName?: string
  }
  
  export interface TutorEducationDetailsTypes {
    educationDoc: any[]
  }
  
  export interface StudentEducationDetailsTypes {
    subject: any[]
  }
  