import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const axiosInstance = axios.create({
  baseURL: '',
  timeout: 1000000,
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
  },
});

// Mock Adapter 인스턴스 생성
export const mock = new MockAdapter(axiosInstance);

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 헤더에 인증 토큰 추가 할수 있음
    // const token = Cookies.get('Authorization');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`; //요청 헤더에 토큰 추가
    // }

    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터를 처리하고 반환
    return response.data;
  },
  (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 에러 처리
    const axiosError = error as AxiosError;
    // 여기서 에러 처리 로직 구현
    return Promise.reject(axiosError);
  },
);
