import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createAxiosInstance = (baseURL: string = BASE_URL) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
