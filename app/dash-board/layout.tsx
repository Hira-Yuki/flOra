export const metadata = {
  title: 'flOra - 대시보드',
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex">
      {/* 사이드바 */}
      <div
        className={`h-full w-24 bg-gray-300 fixed md:static flex-col items-center pt-6 transition-transform transform md:translate-x-0 hidden md:flex`}
      >
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

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col ml-0">
        {/* 헤더 */}

        <div className="h-24 w-full py-8 flex items-center justify-between bg-cyan-400">
          <div className="flex justify-center items-center ml-2">
            {/* 햄버거 버튼 */}
            <button className="md:hidden p-2">
              {/* 햄버거 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <h2 className="text-4xl font-bold pl-8">Dashboard</h2>
          </div>
          <div className="flex gap-6 mr-8 text-white">
            <div className="w-10 h-10 bg-gray-500 text-center flex items-center justify-center">
              검색
            </div>
            <div className="w-10 h-10 bg-gray-500 text-center flex items-center justify-center">
              알림
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-8">{children}</div>
        <nav className="absolute bottom-0 text-2xl md:hidden">
          여기에 메뉴를 만들면 되죠~~
        </nav>
      </div>
    </div>
  );
}
