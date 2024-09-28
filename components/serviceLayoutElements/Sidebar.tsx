'use client';
import { useMenuList } from '@hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ memberPicUrl }) {
  const pathname = usePathname();
  const MENU_ICONS = useMenuList();

  return (
    <div className="z-10 bg-floraOlive h-full w-24 hidden top-0 md:flex flex-col items-center pt-10 md:fixed transition-transform transform">
      <ul className="flex flex-col gap-10 h-full items-center">
        {MENU_ICONS.map(({ component: IconComponent, path }) => (
          <li key={path}>
            <Link aria-label={path} href={path}>
              <IconComponent
                className={`w-9 h-9 text-floraGreen cursor-pointer hover:text-floraYellow ${pathname === path ? 'text-floraWhite' : 'text-floraGreen'}`}
              />
            </Link>
          </li>
        ))}
        <li className="w-11 h-11 rounded-full bg-floraWhite text-center flex items-center justify-center mt-auto mb-8 cursor-pointer">
          <img src={memberPicUrl} className="w-full h-full object-cover" />
        </li>
      </ul>
    </div>
  );
}
