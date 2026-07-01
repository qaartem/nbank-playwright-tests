import type { APIResponse } from '@playwright/test';

type Headers = Record<string, string>;

export const maskSensitiveHeaders = (headers: Headers): Headers =>
  Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      key.toLowerCase() === 'authorization' ? '<masked>' : value,
    ]),
  );

export const buildUnexpectedStatusError = async (
  response: APIResponse,
  expectedStatus: number,
  headers?: Headers,
): Promise<Error> => {
  const responseBody = await response.text();
  const diagnostics = [
    `Expected status: ${expectedStatus}`,
    `Actual status: ${response.status()} ${response.statusText()}`,
    `URL: ${response.url()}`,
  ];

  if (headers) {
    diagnostics.push(
      `Request headers: ${JSON.stringify(maskSensitiveHeaders(headers))}`,
    );
  }

  diagnostics.push(`Response body: ${responseBody}`);

  return new Error(diagnostics.join('\n'));
};
