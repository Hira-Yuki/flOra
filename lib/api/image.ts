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

// member API 인스턴스 생성
export const imageInstance = createAxiosInstance(`${BASE_URL}/members`);

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
    console.log('Auth 이미지 API 요청 인터셉터:', newConfig);
    return newConfig;
  }
  console.log('이미지 API 요청 인터셉터:', config);
  return config;
};

// 응답 인터셉터 설정 함수
const responseInterceptor = (response: any) => {
  console.log('이미지 API 응답 인터셉터:', response);
  return response;
};

// 에러 처리 함수
const errorInterceptor = (error: AxiosError) => {
  console.error('이미지 API 응답 인터셉터 에러:', error);
  return Promise.reject(
    error.response?.data || {
      state: 404,
      message: '이미지 서버가 응답하지 않습니다.',
    },
  );
};

// 요청 인터셉터 생성
imageInstance.interceptors.request.use(requestInterceptor, Promise.reject);

// 응답 인터셉터 생성
imageInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export const imageAPI = {
  postImage: (payload) =>
    imageInstance.post(`/${memberId}/images`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getImage: (params) => imageInstance.get(`/${memberId}/images`, { params }),
  deleteImage: (params) =>
    imageInstance.delete(`/${memberId}/images`, { params }),
};
