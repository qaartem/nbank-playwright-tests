export interface TransferRequest {
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
}

export interface TransferResponse {
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
  message: string;
}
