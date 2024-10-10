import { BASE_URL, createAxiosInstance } from '@lib/axiosInstance';
import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dayjs from 'dayjs';
import useCookie from 'hooks/useCookie';
import { addMember, memberSearch, passwordConfirm } from 'mock/controller';

interface SignInPayload {
  email: string;
  password: string;
}

interface FindPasswordPayload {
  email: string;
}

// 쿠키 설정
const cookie = useCookie();

// member API 인스턴스 생성
export const memberInstance = createAxiosInstance(`${BASE_URL}/members`);

// 요청 인터셉터 설정 함수
const requestInterceptor = (config: any) => {
  const Authorization = cookie.getCookie('Authorization');

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
      expires: dayjs().add(7, 'day').toDate(),
    });
  }

  return response;
};

// 에러 처리 함수
const errorInterceptor = (error: AxiosError) => {
  console.error('member API 응답 인터셉터 에러:', error);

  switch (error.status) {
    case 400:
      return Promise.reject(
        error.response?.data || {
          state: 400,
          message: '요청이 올바르지 않습니다.',
        },
      );
    case 401:
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

// 요청 인터셉터
memberInstance.interceptors.request.use(requestInterceptor, Promise.reject);
// 응답 인터셉터
memberInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// member API
export const memberApi = {
  signUp: (payload: SignInPayload) => memberInstance.post('/signup', payload),
  findPassword: (payload: FindPasswordPayload) =>
    memberInstance.post('/password', payload),
  signOut: () => memberInstance.post('/signout'),
  resetPassword: (memberId: string, newPassword: string) =>
    memberInstance.put(`/${memberId}/password`, newPassword),
  getMemberData: (memberId: string, config = {}) =>
    memberInstance.get(`/${memberId}`, config),
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
// if (useMockApi) setupMockApi(memberInstance);
