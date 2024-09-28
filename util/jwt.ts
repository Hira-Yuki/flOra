import jwt from 'jsonwebtoken';

// JWT 토큰을 디코딩하는 함수
export function parseJwt(token) {
  try {
    // 토큰을 검증하지 않고 디코딩만 수행 (서명 검증 없이 헤더와 페이로드만 확인)
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return null;
  }
}
