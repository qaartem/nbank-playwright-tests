import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value: string): string =>
  value.startsWith('/') ? value : `/${value}`;

export const env = {
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost:4111',
  apiVersion: process.env.API_VERSION ?? '/api/v1',
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin',
  frontendBaseUrl: process.env.FRONTEND_BASE_URL ?? 'http://localhost:3000',
  isCI: process.env.CI === 'true',
} as const;

export const apiUrl = `${trimTrailingSlash(env.apiBaseUrl)}${ensureLeadingSlash(
  env.apiVersion,
)}`;
