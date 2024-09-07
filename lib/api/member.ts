import useMockApi from '@hooks/useMockApi';
import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addMember, memberSearch, passwordConfirm } from 'mock/controller';

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
export const memberInstance = createAxiosInstance(`${BASE_URL}/user`);

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

// 요청 인터셉터
memberInstance.interceptors.request.use(requestInterceptor, Promise.reject);
// 응답 인터셉터
memberInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// member API
export const memberApi = {
  signUp: (payload: SignInPayload) =>
    memberInstance.post<SignInResponse>('/signup', payload),
  findPassword: (payload: FindPasswordPayload) =>
    memberInstance.post('/password', payload),
};

// mock member API
const setupMockApi = (instance: any) => {
  const mock = new MockAdapter(instance);

  mock.onGet('/test').reply(200, {
    message: 'Mock API 호출 성공',
  });

  // 시작하기 ( 회원가입 || 로그인 )
  mock.onPost('/signup').reply((config) => {
    const requestData = JSON.parse(config.data);
    const { email, password } = requestData;

    // 이메일이 등록되지 않은 경우 (회원가입 가능)
    if (!memberSearch(email)) {
      addMember(email, password);
      return [200, { message: '회원가입 성공', receivedData: requestData }];
    }

    // 비밀번호가 매칭되지 않는 경우
    if (!passwordConfirm(email, password)) {
      return [400, { message: '비밀번호가 올바르지 않습니다.' }];
    }

    // 이메일과 비밀번호가 일치하는 경우 (로그인 성공)
    return [200, { message: '로그인 성공', receivedData: requestData }];
  });

  // 비밀번호 찾기
  mock.onPost('/password').reply((config) => {
    const requestData = JSON.parse(config.data);
    const { email } = requestData;

    // 이메일이 등록되지 않은 경우
    if (!memberSearch(email)) {
      return [400, { message: '가입된 적 없는 이메일 주소입니다.' }];
    }

    // 이메일이 존재하는 경우, 인증 메일 발송
    return [
      200,
      {
        message: '인증 메일을 성공적으로 발송했습니다.',
        receivedData: requestData,
      },
    ];
  });
};

// Mock API 설정
if (useMockApi) setupMockApi(memberInstance);
