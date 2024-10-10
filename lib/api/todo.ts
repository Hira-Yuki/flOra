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
    console.log('Auth Todo API 요청 인터셉터:', newConfig);
    return newConfig;
  }
  console.log('Todo API 요청 인터셉터:', config);
  return config;
};

// 응답 인터셉터 설정 함수
const responseInterceptor = (response: any) => {
  console.log('Todo API 응답 인터셉터:', response);

  return response;
};

// 에러 처리 함수
const errorInterceptor = (error: AxiosError) => {
  console.error('Todo API 응답 인터셉터 에러:', error);
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
          message: '요청 권한이 없습니다.',
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

// 요청 인터셉터
todoInstance.interceptors.request.use(requestInterceptor, Promise.reject);
// 응답 인터셉터
todoInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// todo list API
export const todoAPI = {
  createTodoList: (payload) => todoInstance.post(`/${memberId}/todos`, payload),
  getTodoList: ({ isRoutine, todoType, date }) => {
    const queryParams = new URLSearchParams();

    queryParams.append('isRoutine', isRoutine);
    queryParams.append('todoType', todoType);
    queryParams.append('date', date);

    // URL에 쿼리 파라미터를 붙여서 요청
    return todoInstance.get(`/${memberId}/todos?${queryParams.toString()}`);
  },
  updateTodoList: (payload) =>
    todoInstance.put(`/${memberId}/todos/complete`, payload),
};
