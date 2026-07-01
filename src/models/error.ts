export interface ErrorResponse {
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  timestamp?: string;
  [field: string]: string[] | string | number | undefined;
}
