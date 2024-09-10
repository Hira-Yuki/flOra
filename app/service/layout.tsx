import { MENU_NAMES } from '@constants';

export const metadata = {
  title: 'flOra - 대시보드',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuNamesLength = MENU_NAMES.length;

  return (
    // 컨테이너
    <div className="h-screen w-screen flex flex-col">
      {/* 헤더 */}
      <div className="z-10 w-full h-24 md:h-32 py-1 fixed flex items-center md:pl-24 transition-transform transform justify-between bg-gray-200">
        <h2 className="text-4xl font-bold pl-8">Dashboard</h2>
        <div className="flex gap-2 md:gap-6 mr-2 md:mr-8 text-white">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-500 text-center flex items-center justify-center">
            검색
          </div>
          <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-500 text-center flex items-center justify-center">
            알림
          </div>
        </div>
      </div>
      <div className="flex">
        {/* 사이드바 */}
        <div className="z-10 bg-gray-300 h-full w-24 hidden top-0 md:flex flex-col items-center pt-10 md:fixed transition-transform transform">
          <ul className="flex flex-col gap-10 h-full text-white">
            {MENU_NAMES.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className={`w-14 h-14 bg-gray-500 text-center flex items-center justify-center ${index + 1 === menuNamesLength && 'mt-auto mb-8'}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* 메인 콘텐츠 */}
        <div className="pl-0 pt-24 md:pl-24 pb-24 md:pb-0 transition-transform transform w-full bg-gray-200">
          {children}
        </div>
      </div>
      {/* 하단 메뉴 */}
      <div className="bg-cyan-400 h-24 w-full fixed bottom-0 md:hidden flex justify-center">
        <ul className="flex flex-row w-screen text-white items-center justify-between px-4">
          {MENU_NAMES.map((item) => (
            <li
              key={`${item}`}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-500 text-center flex items-center justify-center"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
