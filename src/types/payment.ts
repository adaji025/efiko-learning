export type PaymentState = {
  success: boolean;
  msg: string;
  data: PaymentTypes[];
  length: number;
  total: number;
};

export type PaymentTypes = {
  _id: string;
  amount: string;
  userEmail: string;
  userId: string;
  subscriptionId: SubscriptionId;
  transactionId: string;
  isConfirmed: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface SubscriptionId {
  _id: string;
  type: string;
}
