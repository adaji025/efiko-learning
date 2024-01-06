export type SubscriptionState = {
    success: boolean
    msg: string
    data: SubscriptionTypes[]
    length: number
    total: number
  }
  
  export type SubscriptionTypes = {
    _id: string
    title: string
    status: string
    amount: string
    type: string
    createdAt: string
    updatedAt: string
    __v: number
  }