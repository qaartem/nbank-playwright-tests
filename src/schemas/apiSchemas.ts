import { z } from 'zod';

export const userRoleSchema = z.enum(['ADMIN', 'USER']);

export const createUserResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: userRoleSchema,
});

export const loginResponseSchema = z.object({
  username: z.string(),
  role: userRoleSchema,
});

export const accountTransactionResponseSchema = z.object({
  id: z.number(),
  amount: z.number(),
  type: z.string(),
  timestamp: z.string(),
  relatedAccountId: z.number(),
});

export const accountResponseSchema = z.object({
  id: z.number(),
  accountNumber: z.string(),
  balance: z.number(),
  transactions: z.array(accountTransactionResponseSchema),
});

export const transferResponseSchema = z.object({
  senderAccountId: z.number(),
  receiverAccountId: z.number(),
  amount: z.number(),
  message: z.string(),
});

export const customerProfileResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  name: z.string().nullable(),
  role: userRoleSchema,
  accounts: z.array(accountResponseSchema),
});

export const updateCustomerProfileResponseSchema = z.object({
  customer: customerProfileResponseSchema,
  message: z.string(),
});
