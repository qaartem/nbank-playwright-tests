export type UserRole = 'ADMIN' | 'USER';

export interface CreateUserRequest {
  username: string;
  password: string;
  role: UserRole;
}

export interface CreateUserResponse {
  id: number;
  username: string;
  role: UserRole;
}
