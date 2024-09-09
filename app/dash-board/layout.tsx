export const metadata = {
  title: 'flOra - 대시보드',
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuName = ['홈', '캘린더', '타이머', '플로라', '프로필'];
  const menuNameLength = menuName.length;

  return (
    <div className="h-screen w-screen flex">
      {/* 사이드바 */}
      <div
        className={`h-full w-24 bg-gray-300 fixed md:static flex-col items-center pt-6 transition-transform transform md:translate-x-0 hidden md:flex`}
      >
        <ul className="flex flex-col gap-10 h-full text-white">
          {menuName.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className={`w-14 h-14 bg-gray-500 text-center flex items-center justify-center ${index + 1 === menuNameLength && 'mt-auto mb-6'}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col ml-0">
        {/* 헤더 */}

        <div className="h-24 w-full py-8 flex items-center justify-between">
          <div className="flex justify-center items-center ml-2">
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
        {/* 하단 메뉴 */}
        <nav className="absolute bottom-0 text-xl md:hidden bg-slate-400 h-24 flex">
          <ul className="flex flex-row gap-10 w-screen text-white items-center justify-between px-7">
            {menuName.map((item) => (
              <li
                key={item}
                className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
