import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import useCookie from 'hooks/useCookie';
import { parseJwt } from 'util/jwt';

// 쿠키 설정
const cookie = useCookie();
const Authorization = cookie.getCookie('Authorization');
const jwt = Authorization?.split(' ')[1] ?? null;
const token = jwt ? parseJwt(jwt) : null;
const memberId = token?.memberId;

// API 인스턴스 생성
export const motivationInstance = createAxiosInstance(
  `${BASE_URL}/members/${memberId}/promises`,
);

// 요청 인터셉터 설정 함수
const requestInterceptor = (config: any) => {
  if (Authorization) {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers, // 기존 헤더 유지
        Authorization,
      },
    };
    console.log('Auth 다짐 API 요청 인터셉터:', newConfig);
    return newConfig;
  }
  console.log('다짐 API 요청 인터셉터:', config);
  return config;
};

// 응답 인터셉터 설정 함수
const responseInterceptor = (response: any) => {
  console.log('다짐 API 응답 인터셉터:', response);

  return response;
};

// 에러 처리 함수
const errorInterceptor = (error: AxiosError) => {
  console.error('다짐 API 응답 인터셉터 에러:', error);
  switch (error.status) {
    case 400:
      return Promise.reject(
        error.response?.data || {
          state: 400,
          message: '요청이 올바르지 않습니다.',
        },
      );
    case 401:
      cookie.removeCookie('Authorization');
      return Promise.reject(
        error.response?.data || {
          state: 401,
          message: '인증 토큰이 올바르지 않습니다.',
        },
      );
    case 403:
      return Promise.reject(
        error.response?.data || {
          state: 403,
          message: '비밀번호가 올바르지 않습니다.',
        },
      );
    case 404:
      return Promise.reject(
        error.response?.data || {
          state: 404,
          message: '서버를 찾을 수 없습니다.',
        },
      );
    default:
      return Promise.reject(
        error.response?.data || {
          state: 0,
          message: '알 수 없는 오류가 발생했습니다.',
        },
      );
  }
};

// 요청 인터셉터 생성
motivationInstance.interceptors.request.use(requestInterceptor, Promise.reject);

// 응답 인터셉터 생성
motivationInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor,
);

export const motivationAPI = {
  createMotivation: (payload) => motivationInstance.post('', payload),
  getMotivation: () => motivationInstance.get(''),
  modifyMotivation: (payload) => motivationInstance.put('', payload),
  deleteMotivation: () => motivationInstance.delete(''),
};
