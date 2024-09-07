import axios from 'axios';

export const BASE_URL = 'http://localhost:3000' as const;

export const createAxiosInstance = (baseURL: string = BASE_URL) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
