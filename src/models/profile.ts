import type { AccountResponse } from './account';
import type { UserRole } from './user';

export interface CustomerProfileResponse {
  id: number;
  username: string;
  password: string;
  name: string | null;
  role: UserRole;
  accounts: AccountResponse[];
}

export interface UpdateCustomerProfileRequest {
  name: string;
}

export interface UpdateCustomerProfileResponse {
  customer: CustomerProfileResponse;
  message: string;
}
