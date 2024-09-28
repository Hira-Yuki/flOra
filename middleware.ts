import { ROUTE_LISTS } from '@constants';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { cookies } = request;

  // 사용자 세션 쿠키가 있는지 확인
  const userToken = cookies.get('Authorization');
  if (!userToken) {
    const response = NextResponse.redirect(
      new URL(ROUTE_LISTS.signIn, request.url),
    );
    response.cookies.set(
      'login-message',
      '로그인이 필요합니다. 로그인 후 이용해 주세요.',
      { path: '/' },
    );
    return response;
  }

  // 쿠키가 있으면 요청을 통과
  return NextResponse.next();
}

// 미들웨어를 적용할 경로
export const config = {
  matcher: ['/dash-board/:path*', '/calendar/:path*', '/timer/:path*'], // 보호하려는 경로 패턴
};
