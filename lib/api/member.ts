import useMockApi from '@hooks/useMockApi';
import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

interface SignInPayload {
  email: string;
  password: string;
}

interface SignInResponse {
  state: number;
  message: string;
}

interface FindPasswordPayload {
  email: string;
}

// member API 인스턴스 생성
export const memberInstance = createAxiosInstance(BASE_URL + '/user');

// member API 요청 인터셉터 설정
memberInstance.interceptors.request.use(
  (config) => {
    // 요청 시 필요한 member 관련 헤더 추가 예시
    // const token = localStorage.getItem('userToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('member API 요청 인터셉터:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// member API 응답 인터셉터 설정
memberInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    console.log('member API 응답 인터셉터:', response);
    return response;
  },
  (error: AxiosError) => {
    // 에러 처리 로직
    console.error('member API 응답 인터셉터 에러:', error);
    return Promise.reject(
      error.response?.data || {
        state: 0,
        message: '알 수 없는 오류가 발생했습니다.',
      },
    );
  },
);

// member API
export const memberApi = {
  signUp: (payload: SignInPayload) =>
    memberInstance.post<SignInResponse>('/signup', payload),
  findPassword: (payload: FindPasswordPayload) =>
    memberInstance.post('/password', payload),
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

  mock.onPost('/password').reply((config) => {
    const requestData = JSON.parse(config.data);

    if (requestData.email) {
      return [
        200,
        {
          message: '인증 메일을 성공적으로 발송했습니다.',
          receivedData: requestData,
        },
      ];
    } else {
      return [400, { message: '가입된 적 없는 이메일 주소입니다.' }];
    }
  });
}
