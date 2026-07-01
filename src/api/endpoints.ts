export const endpoints = {
  login: 'auth/login',
  adminUsers: 'admin/users',
  accounts: 'accounts',
  customerAccounts: 'customer/accounts',
  customerProfile: 'customer/profile',
  deposit: 'accounts/deposit',
  transfer: 'accounts/transfer',
} as const;

export type EndpointName = keyof typeof endpoints;
