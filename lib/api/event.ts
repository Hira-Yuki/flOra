import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useCookie from 'hooks/useCookie';
import { parseJwt } from 'util/jwt';

/**
 * 이벤트 API를 호출하기 위한 기본 인터페이스
 *  @todo members API와 URL을 공유하는가?? 확인할 것.
 */
export const eventInstance = createAxiosInstance(`${BASE_URL}/members`);

const cookie = useCookie();
const Authorization = cookie.getCookie('Authorization');

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

const header = Authorization?.split(' ')[1];
const token = parseJwt(header);
const memberId = token?.memberId;

// 요청 인터셉터 생성
eventInstance.interceptors.request.use(requestInterceptor, Promise.reject);

// 응답 인터셉터 생성
eventInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export const eventAPI = {
  createEvent: (payload) => eventInstance.post(`/${memberId}/events`, payload),
};

const setupMockApi = (instance: any) => {
  const mock = new MockAdapter(instance);

  // mock.onGet('/test').reply(200, {
  //   message: 'Mock API 호출 성공',
  // });
};

// Mock API 설정
// if (useMockApi) setupMockApi(eventInstance);
