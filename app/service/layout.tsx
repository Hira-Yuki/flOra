import CalendarIcon from '@components/icons/CalendarIcon';
import DashBoardIcon from '@components/icons/DashBoardIcon';
import FloraIcon from '@components/icons/FloraIcon';
import NotificationIcon from '@components/icons/NotificationIcon';
import SearchIcon from '@components/icons/SearchIcon';
import TimerIcon from '@components/icons/TimerIcon';

export const metadata = {
  title: 'flOra - 대시보드',
};

const MENU_ICONS = [
  { component: DashBoardIcon, key: 'dashboard' },
  { component: CalendarIcon, key: 'calendar' },
  { component: TimerIcon, key: 'timer' },
  { component: FloraIcon, key: 'flora' },
];

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 컨테이너
    <div className="h-screen w-screen flex flex-col">
      {/* 헤더 */}
      <div className="z-10 w-full h-24 md:h-32 py-1 fixed flex items-center md:pl-24 transition-transform transform justify-between bg-floraWhite">
        <h2 className="text-4xl font-bold pl-8">Dashboard</h2>
        <div className="flex gap-2 md:gap-6 mr-2 md:mr-8">
          <SearchIcon className={'w-10 h-10 md:w-14 md:h-14'} />
          <NotificationIcon className={'w-10 h-10 md:w-14 md:h-14'} />
        </div>
      </div>
      <div className="flex">
        {/* 사이드바 */}
        <div className="z-10 bg-floraOlive h-full w-24 hidden top-0 md:flex flex-col items-center pt-10 md:fixed transition-transform transform">
          <ul className="flex flex-col gap-10 h-full">
            {MENU_ICONS.map(({ component: IconComponent, key }) => (
              <li key={key}>
                <IconComponent className="w-14 h-14 text-black" />
              </li>
            ))}
            <li className="w-14 h-14 rounded-full bg-floraWhite text-center flex items-center justify-center mt-auto mb-8">
              프로필
            </li>
          </ul>
        </div>
        {/* 메인 콘텐츠 */}
        <div className="pl-0 pt-24 md:pl-24 pb-24 md:pb-0 transition-transform transform w-full bg-floraWhite">
          {children}
        </div>
      </div>
      {/* 하단 메뉴 */}
      <div className="bg-floraBeige h-24 w-full fixed bottom-0 md:hidden flex justify-center">
        <ul className="flex flex-row w-screen text-white items-center justify-around">
          {MENU_ICONS.map(({ component: IconComponent, key }) => (
            <li key={key}>
              <IconComponent className="w-10 h-10 sm:w-14 sm:h-14 text-floraOlive" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
