export interface AccountTransactionResponse {
  id: number;
  amount: number;
  type: string;
  timestamp: string;
  relatedAccountId: number;
}

export interface AccountResponse {
  id: number;
  accountNumber: string;
  balance: number;
  transactions: AccountTransactionResponse[];
}

export type CreateAccountResponse = AccountResponse;

export type CustomerAccountResponse = AccountResponse;

export interface DepositRequest {
  id: number;
  balance: number;
}

export type DepositResponse = AccountResponse;
