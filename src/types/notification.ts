export type NotificationState = {
    success: boolean
    msg: string
    data: NotificationTypes[]
  }
  
  export interface NotificationTypes {
    _id: string
    recipientId: RecipientId
    title: string
    message: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface RecipientId {
    _id: string
  }
  