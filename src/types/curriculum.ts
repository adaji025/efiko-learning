export type CurriculumState = {
    success: boolean
    msg: string
    data: CurriculumTypes[]
    length: number
  }
  
  export type CurriculumTypes = {
    _id: string
    title: string
    description: string
    pdfFile: string
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  