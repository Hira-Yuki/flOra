'use client';
import { useMenuList } from '@hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const MENU_ICONS = useMenuList();

  return (
    <div className="z-10 bg-floraOlive h-full w-24 hidden top-0 md:flex flex-col items-center pt-10 md:fixed transition-transform transform">
      <ul className="flex flex-col gap-10 h-full items-center">
        {MENU_ICONS.map(({ component: IconComponent, path }) => (
          <li key={path}>
            <Link href={path}>
              <IconComponent
                className={`w-10 h-10 text-floraGreen cursor-pointer hover:text-floraYellow ${pathname === path ? 'text-floraWhite' : 'text-floraGreen'}`}
              />
            </Link>
          </li>
        ))}
        <li className="w-14 h-14 rounded-full bg-floraWhite text-center flex items-center justify-center mt-auto mb-8">
          프로필
        </li>
      </ul>
    </div>
  );
}
