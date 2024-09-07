import useMockApi from '@hooks/useMockApi';
import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import MockAdapter from 'axios-mock-adapter';

interface signInPayload {
  email: string;
  password: string;
}

// User API 인스턴스 생성
export const memberInstance = createAxiosInstance(BASE_URL + '/user');

// member API
export const memberApi = {
  signUp: (payload: signInPayload) => memberInstance.post('/signup', payload),
};

// mock member API
if (useMockApi) {
  const mock = new MockAdapter(memberInstance);

  mock.onGet('/test').reply(200, {
    message: 'Mock API 호출 성공',
  });

  mock.onPost('/signup').reply((config) => {
    const requestData = JSON.parse(config.data);
    if (requestData.email && requestData.password) {
      return [200, { message: '회원가입 성공', receivedData: requestData }];
    } else {
      return [400, { message: '이메일 또는 비밀번호가 올바르지 않습니다.' }];
    }
  });
}
