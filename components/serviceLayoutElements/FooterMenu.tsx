'use client';
import { useMenuList } from '@hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FooterMenu() {
  const pathname = usePathname();
  const MENU_ICONS = useMenuList();

  return (
    <div className="bg-floraOlive h-24 w-full fixed bottom-0 md:hidden flex justify-center">
      <ul className="flex flex-row w-full items-center justify-around">
        {MENU_ICONS.map(({ component: IconComponent, path }) => (
          <li key={path}>
            <Link aria-label={path} href={path}>
              <IconComponent
                className={`w-10 h-10 text-floraGreen hover:text-floraYellow ${pathname === path ? 'text-floraWhite' : 'text-floraGreen'}`}
              />
            </Link>
          </li>
        ))}
        <li className="w-14 h-14 rounded-full bg-floraWhite text-center flex items-center justify-center">
          프로필
        </li>
      </ul>
    </div>
  );
}
