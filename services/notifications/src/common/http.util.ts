import axios, { AxiosRequestConfig } from 'axios';

export const httpPost = async <T = unknown>(
  url: string,
  data: unknown,
  opts?: AxiosRequestConfig,
): Promise<T> => {
  const res = await axios.post<T>(url, data, {
    timeout: 5000,
    headers: { 'Content-Type': 'application/json', ...(opts?.headers ?? {}) },
    ...opts,
  });
  return res.data;
};
