import NotificationIcon from '@components/icons/NotificationIcon';
import SearchIcon from '@components/icons/SearchIcon';
import FooterMenu from '@components/serviceLayoutElements/FooterMenu';
import LayoutHeader from '@components/serviceLayoutElements/LayoutHeader';
import Sidebar from '@components/serviceLayoutElements/Sidebar';
import { memberApi } from '@lib/api/member';
import useServerCookie from 'hooks/useServerCookie';
import { Metadata } from 'next';
import { parseJwt } from 'util/jwt';

export const metadata: Metadata = {
  title: { template: '%s | flOra', default: 'Loading | flOra' },
};

export default async function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let memberPic = null;
  const cookie = useServerCookie();
  const Authorization = cookie.getServerCookie('Authorization');
  const header = Authorization?.split(' ')[1];

  if (header) {
    const token = parseJwt(header);
    const memberId = token?.memberId;
    if (memberId) {
      const { data } = await memberApi.getMemberData(memberId, {
        headers: {
          Authorization,
        },
      });
      memberPic = data?.imageUrl;
    }
  }

  return (
    // 컨테이너
    <div className="h-screen w-screen flex flex-col">
      {/* 헤더 */}
      <div className="z-10 w-full h-24 md:h-32 py-1 fixed flex items-center md:pl-24 transition-transform transform justify-between bg-floraWhite">
        <h2 className="text-3xl md:text-5xl font-bold pl-8 cursor-default">
          <LayoutHeader />
        </h2>
        <div className="flex gap-2 md:gap-6 mr-2 md:mr-8">
          <SearchIcon
            className={
              'w-10 h-10 md:w-10 md:h-10 text-floraGreen cursor-pointer hover:text-floraYellow'
            }
          />
          <NotificationIcon
            className={
              'w-10 h-10 md:w-10 md:h-10 text-floraGreen cursor-pointer hover:text-floraYellow'
            }
          />
        </div>
      </div>
      <div className="flex h-full">
        {/* 사이드바 */}
        <Sidebar memberPicUrl={memberPic} />
        {/* 메인 콘텐츠 */}
        <div className="pl-0 pt-24 md:pl-24 pb-24 md:pb-0 transition-transform transform w-full h-full bg-floraWhite">
          <div className="p-8 mt-2 h-full">{children}</div>
        </div>
      </div>
      {/* 하단 메뉴 */}
      <FooterMenu memberPicUrl={memberPic} />
    </div>
  );
}
