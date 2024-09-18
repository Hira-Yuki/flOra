import { useMockApi } from '@hooks';
import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

/**
 * 이벤트 API를 호출하기 위한 기본 인터페이스
 *  @todo members API와 URL을 공유하는가?? 확인할 것.
 */
export const eventInstance = createAxiosInstance(`${BASE_URL}/members`);

// 요청 인터셉터 설정 함수
const requestInterceptor = (config: any) => {
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

// 요청 인터셉터 생성
eventInstance.interceptors.request.use(requestInterceptor, Promise.reject);

// 응답 인터셉터 생성
eventInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export const eventAPI = {
  /**
   * @payload in {title, description, startDateTime, endDateTime, index, isDDay}
   * @title {string}
   * @description {string}
   * @startDateTime {string}
   * @endDateTime {string}
   * @index {color}
   * @isDDay {boolean}
   */
  createEvent: (memberId: string, payload) =>
    eventInstance.post(`/${memberId}/events`, payload),
};

const setupMockApi = (instance: any) => {
  const mock = new MockAdapter(instance);

  // mock.onGet('/test').reply(200, {
  //   message: 'Mock API 호출 성공',
  // });
};

// Mock API 설정
if (useMockApi) setupMockApi(eventInstance);
