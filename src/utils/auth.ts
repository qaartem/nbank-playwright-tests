export const basicAuth = (username: string, password: string): string => {
  const credentials = Buffer.from(`${username}:${password}`, 'utf-8').toString(
    'base64',
  );

  return `Basic ${credentials}`;
};
