export interface CreateAccountResponse {
  id: number;
  balance: number;
}

export interface CustomerAccountResponse {
  id: number;
  balance: number;
}

export interface DepositRequest {
  accountId: number;
  amount: number;
}

export interface DepositResponse {
  accountId: number;
  balance: number;
}
