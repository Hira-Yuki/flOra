// 환경 변수로 Mock API 사용 여부 결정
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export default useMockApi;
