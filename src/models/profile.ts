import type { UserRole } from './user';

export interface CustomerProfileResponse {
  username: string;
  role: UserRole;
}

export interface UpdateCustomerProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
