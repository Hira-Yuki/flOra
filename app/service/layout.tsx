import NotificationIcon from '@components/icons/NotificationIcon';
import SearchIcon from '@components/icons/SearchIcon';
import FooterMenu from '@components/serviceLayoutElements/FooterMenu';
import Sidebar from '@components/serviceLayoutElements/Sidebar';

export const metadata = {
  title: 'flOra - 대시보드',
};

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
        <h2 className="text-5xl font-bold pl-8 cursor-default">Dashboard</h2>
        <div className="flex gap-2 md:gap-6 mr-2 md:mr-8">
          <SearchIcon className={'w-10 h-10 md:w-10 md:h-10 text-floraGreen'} />
          <NotificationIcon
            className={'w-10 h-10 md:w-10 md:h-10 text-floraGreen'}
          />
        </div>
      </div>
      <div className="flex">
        {/* 사이드바 */}
        <Sidebar />
        {/* 메인 콘텐츠 */}
        <div className="pl-0 pt-24 md:pl-24 pb-24 md:pb-0 transition-transform transform w-full bg-floraWhite">
          {children}
        </div>
      </div>
      {/* 하단 메뉴 */}
      <FooterMenu />
    </div>
  );
}
