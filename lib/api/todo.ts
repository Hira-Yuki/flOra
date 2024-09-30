import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import useCookie from 'hooks/useCookie';
import { parseJwt } from 'util/jwt';

// 쿠키 설정
const cookie = useCookie();
const Authorization = cookie.getCookie('Authorization');

const jwt = Authorization?.split(' ')[1];
const token = parseJwt(jwt);
const memberId = token?.memberId;

// todo list API 인스턴스 생성
export const todoInstance = createAxiosInstance(`${BASE_URL}/members`);

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
    console.log('Auth member API 요청 인터셉터:', newConfig);
    return newConfig;
  }
  console.log('member API 요청 인터셉터:', config);
  return config;
};

// 응답 인터셉터 설정 함수
const responseInterceptor = (response: any) => {
  console.log('member API 응답 인터셉터:', response);
  const token = response.headers?.authorization;
  if (token) {
    cookie.setCookie('Authorization', response.headers.authorization, {
      path: '/',
      secure: '/',
      httponly: true,
      sameSite: 'Strict',
      expires: dayjs().add(1, 'hour').toDate(),
    });
  }

  return response;
};

// 에러 처리 함수
const errorInterceptor = (error: AxiosError) => {
  console.error('member API 응답 인터셉터 에러:', error);
  return Promise.reject(
    error.response?.data || {
      state: 0,
      message: '알 수 없는 오류가 발생했습니다.',
    },
  );
};

// 요청 인터셉터
todoInstance.interceptors.request.use(requestInterceptor, Promise.reject);
// 응답 인터셉터
todoInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// todo list API
export const eventAPI = {
  createTodoList: (payload) => todoInstance.post(`/${memberId}/todo`, payload),
  getTodoList: () => todoInstance.get(`/${memberId}/todo`),
};
