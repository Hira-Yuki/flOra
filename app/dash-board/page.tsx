export default function DashBoard() {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* 사이드바 */}
      <div className="h-full w-24 bg-gray-300 absolute flex flex-col items-center pt-6">
        <ul className="flex flex-col gap-10 h-full text-white">
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            홈
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            캘린더
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            타이머
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            플로라
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center mt-auto mb-6">
            프로필
          </li>
        </ul>
      </div>

      {/* 헤더 */}
      <div className="h-24 w-full pl-24 py-8 flex items-center">
        <h2 className="ml-8 text-4xl">Dashboard</h2>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 ml-24">내용 : 몬가... 한다...</div>
    </div>
  );
}
